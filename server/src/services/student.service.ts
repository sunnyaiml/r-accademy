import prisma from '../config/database';

export const getSubjects = async (studentProfileId: number) => {
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentProfileId },
    include: { class: { include: { subjects: { include: { subject: { include: { teachers: { include: { teacherProfile: { include: { user: true } } } } } } } } } } },
  });

  if (!student?.class) return [];

  return student.class.subjects.map((sc) => {
    const teacher = sc.subject.teachers[0]?.teacherProfile?.user?.name || 'TBA';
    return {
      id: sc.subject.id,
      name: sc.subject.name,
      teacher,
      nextClass: 'Tomorrow, 10:00 AM',
      assignments: 0,
    };
  });
};

export const getTests = async (studentProfileId: number, status: string) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: studentProfileId } });
  if (!student) return [];

  if (status === 'upcoming') {
    const tests = await prisma.test.findMany({
      where: {
        grade: student.grade,
        status: { in: ['active', 'draft'] },
        date: { gte: new Date() },
      },
      include: { subject: true },
      orderBy: { date: 'asc' },
    });

    return tests.map((t) => ({
      id: t.id,
      subject: t.subject.name,
      date: t.date.toISOString().split('T')[0],
      duration: `${t.duration} min`,
      topics: [],
      type: t.type.replace('_', ' '),
      status: t.status === 'active' ? 'active' : 'upcoming',
    }));
  }

  // Past tests
  const submissions = await prisma.testSubmission.findMany({
    where: { studentProfileId },
    include: { test: { include: { subject: true } } },
    orderBy: { submittedAt: 'desc' },
  });

  return submissions.map((s) => ({
    id: s.id,
    subject: s.test.subject.name,
    date: s.test.date.toISOString().split('T')[0],
    score: `${s.score}/${s.test.totalMarks}`,
    percentage: s.percentage || 0,
    grade: s.grade || 'N/A',
  }));
};

export const getMeetings = async (studentProfileId: number) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: studentProfileId } });
  if (!student) return [];

  const meetings = await prisma.meeting.findMany({
    where: {
      grade: student.grade,
      status: { in: ['scheduled', 'active'] },
      participants: { has: 'students' },
    },
    include: { teacherProfile: { include: { user: true } } },
    orderBy: { date: 'asc' },
  });

  return meetings.map((m) => ({
    id: m.id,
    title: m.title,
    teacher: m.teacherProfile.user.name,
    time: m.time,
    type: m.type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) as any,
    status: m.status === 'active' ? 'active' : 'upcoming',
    meetingUrl: m.meetingUrl,
  }));
};

export const getAssignments = async (studentProfileId: number) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: studentProfileId } });
  if (!student) return [];

  const assignments = await prisma.assignment.findMany({
    where: { grade: student.grade, status: { not: 'draft' } },
    include: {
      subject: true,
      submissions: { where: { studentProfileId } },
    },
    orderBy: { deadline: 'asc' },
  });

  return assignments.map((a) => {
    const submission = a.submissions[0];
    let status: string = 'pending';
    if (submission) {
      status = submission.marks !== null ? 'graded' : 'submitted';
    } else if (new Date(a.deadline) < new Date()) {
      status = 'overdue';
    }

    return {
      id: a.id,
      title: a.title,
      subject: a.subject.name,
      deadline: a.deadline.toISOString().split('T')[0],
      status,
      marks: submission?.marks ? `${submission.marks}/${a.totalMarks || 100}` : undefined,
    };
  });
};

export const getTimetable = async (studentProfileId: number, date?: string) => {
  const student = await prisma.studentProfile.findUnique({ where: { id: studentProfileId } });
  if (!student?.classId) return [];

  const targetDate = date ? new Date(date) : new Date();
  const dayOfWeek = targetDate.getDay();

  const slots = await prisma.timetableSlot.findMany({
    where: { classId: student.classId, dayOfWeek },
    include: { subject: true },
    orderBy: { startTime: 'asc' },
  });

  return slots.map((s) => ({
    time: `${s.startTime} - ${s.endTime}`,
    subject: s.subject.name,
    teacher: s.teacherName,
    room: s.room,
  }));
};

export const getNotifications = async (userId: number) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return notifications.map((n) => ({
    id: n.id,
    message: n.message,
    time: n.createdAt.toISOString(),
    type: n.type,
    read: n.read,
  }));
};

export const markNotificationRead = async (notificationId: number, userId: number) => {
  const notification = await prisma.notification.findFirst({
    where: { id: notificationId, userId },
  });

  if (!notification) throw new Error('Notification not found');

  await prisma.notification.update({
    where: { id: notificationId },
    data: { read: true },
  });

  return { message: 'Notification marked as read' };
};

export const getPerformance = async (studentProfileId: number) => {
  const submissions = await prisma.testSubmission.findMany({
    where: { studentProfileId },
    include: { test: { include: { subject: true } } },
  });

  const subjectMap = new Map<string, number[]>();
  for (const s of submissions) {
    const name = s.test.subject.name;
    if (!subjectMap.has(name)) subjectMap.set(name, []);
    subjectMap.get(name)!.push(s.percentage || 0);
  }

  return Array.from(subjectMap.entries()).map(([subject, scores]) => ({
    subject,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    trend: scores.length >= 2 && scores[scores.length - 1] >= scores[scores.length - 2] ? 'up' : 'down',
  }));
};

export const getDailyProgress = async (studentProfileId: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const progress = await prisma.dailyProgress.findFirst({
    where: {
      studentProfileId,
      date: today,
    },
  });

  if (!progress) {
    return {
      attendance: 'Present',
      classesAttended: 0,
      totalClasses: 0,
      tasksCompleted: 0,
      totalTasks: 0,
      todayRating: 0,
      teacherRemark: 'No report yet for today.',
    };
  }

  return {
    attendance: progress.attendance.charAt(0).toUpperCase() + progress.attendance.slice(1),
    classesAttended: progress.classesAttended,
    totalClasses: progress.totalClasses,
    tasksCompleted: progress.tasksCompleted,
    totalTasks: progress.totalTasks,
    todayRating: progress.todayRating,
    teacherRemark: progress.teacherRemark,
    behaviorNote: progress.behaviorNote,
  };
};
