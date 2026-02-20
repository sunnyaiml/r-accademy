import prisma from '../config/database';
import { hashPassword } from '../utils/hash';
import { Role } from '@prisma/client';

// ─── TEACHER MANAGEMENT ────────────────────────────────────────────

export const getTeachers = async () => {
  const teachers = await prisma.teacherProfile.findMany({
    include: {
      user: true,
      subjectsTaught: { include: { subject: true } },
      classTeacherOf: true,
    },
  });

  return teachers.map((t) => ({
    id: t.id,
    name: t.user.name,
    email: t.user.email,
    phone: t.user.phone,
    subject: t.specialization || t.subjectsTaught[0]?.subject.name || 'N/A',
    classes: t.classTeacherOf.map((c) => `${c.grade}-${c.section}`),
    students: 0,
    status: t.status,
    joinDate: t.joinDate.toISOString().split('T')[0],
  }));
};

export const appointTeacher = async (data: {
  name: string;
  email: string;
  phone: string;
  specialization: string;
}) => {
  const hashedPassword = await hashPassword('password123');

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: 'teacher',
      isVerified: true,
    },
  });

  const teacherProfile = await prisma.teacherProfile.create({
    data: {
      userId: user.id,
      specialization: data.specialization,
    },
  });

  return {
    id: teacherProfile.id,
    name: user.name,
    email: user.email,
    subject: data.specialization,
    status: 'active',
  };
};

export const updateTeacher = async (teacherId: number, updates: any) => {
  const profile = await prisma.teacherProfile.update({
    where: { id: teacherId },
    data: {
      ...(updates.status && { status: updates.status }),
      ...(updates.specialization && { specialization: updates.specialization }),
    },
    include: { user: true },
  });

  return {
    id: profile.id,
    name: profile.user.name,
    status: profile.status,
  };
};

// ─── STUDENT MANAGEMENT ────────────────────────────────────────────

export const getStudents = async () => {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: true,
      parents: {
        include: { parentProfile: { include: { user: true } } },
      },
    },
  });

  return students.map((s) => ({
    id: s.id,
    name: s.user.name,
    email: s.user.email,
    grade: s.grade,
    section: s.section,
    attendance: 0,
    gpa: s.gpa || 0,
    parentName: s.parents[0]?.parentProfile.user.name || 'N/A',
    status: s.status,
  }));
};

export const enrollStudent = async (data: {
  name: string;
  email: string;
  phone: string;
  grade: string;
  section: string;
}) => {
  const hashedPassword = await hashPassword('password123');

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: 'student',
      isVerified: true,
    },
  });

  const cls = await prisma.class.findUnique({
    where: { grade_section: { grade: data.grade, section: data.section } },
  });

  const studentId = `STU${String(user.id).padStart(5, '0')}`;
  const profile = await prisma.studentProfile.create({
    data: {
      userId: user.id,
      studentId,
      grade: data.grade,
      section: data.section,
      classId: cls?.id,
    },
  });

  return {
    id: profile.id,
    name: user.name,
    studentId,
    grade: data.grade,
    section: data.section,
  };
};

// ─── CLASS MANAGEMENT ──────────────────────────────────────────────

export const getClasses = async () => {
  const classes = await prisma.class.findMany({
    include: {
      classTeacher: { include: { user: true } },
      students: true,
      subjects: { include: { subject: true } },
    },
  });

  return classes.map((c) => ({
    id: c.id,
    grade: c.grade,
    section: c.section,
    classTeacher: c.classTeacher?.user.name || 'Unassigned',
    students: c.students.length,
    capacity: c.capacity,
    subjects: c.subjects.map((s) => s.subject.name),
  }));
};

export const createClass = async (data: {
  grade: string;
  section: string;
  classTeacherId?: number;
  capacity: number;
}) => {
  const cls = await prisma.class.create({
    data: {
      grade: data.grade,
      section: data.section,
      classTeacherId: data.classTeacherId,
      capacity: data.capacity,
    },
  });

  return cls;
};

// ─── PROMOTE STUDENTS ──────────────────────────────────────────────

export const promoteStudents = async (sourceGrade: string, sourceSection: string) => {
  const students = await prisma.studentProfile.findMany({
    where: { grade: sourceGrade, section: sourceSection, status: 'active' },
  });

  const nextGrade = String(parseInt(sourceGrade) + 1);
  let promoted = 0;

  for (const student of students) {
    if ((student.gpa || 0) >= 2.0) {
      await prisma.studentProfile.update({
        where: { id: student.id },
        data: { grade: nextGrade, status: 'promoted' },
      });
      promoted++;
    }
  }

  return { promoted, total: students.length };
};

// ─── SYSTEM CONFIG ─────────────────────────────────────────────────

export const getConfig = async () => {
  const configs = await prisma.systemConfig.findMany();
  const result: Record<string, string> = {};
  for (const c of configs) {
    result[c.key] = c.value;
  }
  return result;
};

export const updateConfig = async (key: string, value: string) => {
  return prisma.systemConfig.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
};

// ─── AUDIT LOG ─────────────────────────────────────────────────────

export const getAuditLog = async () => {
  const logs = await prisma.auditLog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return logs.map((l) => ({
    id: l.id,
    action: l.action,
    user: l.user.name,
    timestamp: l.createdAt.toISOString(),
    details: l.details,
    type: l.type,
  }));
};

// ─── ANALYTICS ─────────────────────────────────────────────────────

export const getAnalytics = async () => {
  const totalTeachers = await prisma.teacherProfile.count({ where: { status: 'active' } });
  const totalStudents = await prisma.studentProfile.count({ where: { status: 'active' } });
  const totalClasses = await prisma.class.count();
  const totalParents = await prisma.parentProfile.count();

  // Enrollment by grade
  const enrollmentByGrade = await prisma.studentProfile.groupBy({
    by: ['grade'],
    _count: true,
    where: { status: 'active' },
  });

  return {
    totalTeachers,
    totalStudents,
    totalClasses,
    totalParents,
    enrollmentByGrade: enrollmentByGrade.map((e) => ({
      grade: e.grade,
      count: e._count,
    })),
  };
};

// ─── ANNOUNCEMENTS ─────────────────────────────────────────────────

export const broadcastAnnouncement = async (
  sentById: number,
  data: { title: string; message: string; targetAudience: string }
) => {
  const announcement = await prisma.announcement.create({
    data: {
      title: data.title,
      message: data.message,
      sentById,
      targetAudience: data.targetAudience as any,
      type: 'school',
    },
  });

  // Create notifications for target audience
  let targetRole: Role | null = null;
  if (data.targetAudience === 'teachers') targetRole = 'teacher';
  else if (data.targetAudience === 'students') targetRole = 'student';
  else if (data.targetAudience === 'parents') targetRole = 'parent';

  const where = targetRole ? { role: targetRole } : {};
  const users = await prisma.user.findMany({ where, select: { id: true } });

  await prisma.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      message: `${data.title}: ${data.message}`,
      type: 'announcement' as const,
    })),
  });

  return announcement;
};
