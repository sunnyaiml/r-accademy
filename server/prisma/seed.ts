import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // ─── SYSTEM CONFIG ─────────────────────────────────────────────
  await prisma.systemConfig.createMany({
    data: [
      { key: 'academic_year', value: '2025-2026' },
      { key: 'grading_scale', value: 'A+ (90%), A (80%), B+ (70%), B (60%), C (50%), D (40%), F (<40%)' },
      { key: 'term_structure', value: '3 Terms' },
      { key: 'promotion_criteria', value: '75% attendance, 2.0 GPA minimum' },
    ],
    skipDuplicates: true,
  });

  // ─── SUBJECTS ──────────────────────────────────────────────────
  const subjects = await Promise.all(
    ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science', 'Biology'].map((name) =>
      prisma.subject.upsert({ where: { name }, update: {}, create: { name } })
    )
  );
  const [math, physics, chemistry, english, cs, biology] = subjects;

  // ─── ADMIN USER ────────────────────────────────────────────────
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@r-education.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@r-education.com',
      phone: '9999999999',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    },
  });

  // ─── TEACHER USERS ─────────────────────────────────────────────
  const teacherData = [
    { name: 'Dr. Robert Smith', email: 'teacher@r-education.com', phone: '9876543210', specialization: 'Mathematics' },
    { name: 'Ms. Emily Chen', email: 'emily.chen@r-education.com', phone: '9876543211', specialization: 'Physics' },
    { name: 'Mr. James Wilson', email: 'james.wilson@r-education.com', phone: '9876543212', specialization: 'English' },
    { name: 'Dr. Lisa Park', email: 'lisa.park@r-education.com', phone: '9876543213', specialization: 'Chemistry' },
    { name: 'Mr. David Brown', email: 'david.brown@r-education.com', phone: '9876543214', specialization: 'Computer Science' },
    { name: 'Ms. Sarah James', email: 'sarah.james@r-education.com', phone: '9876543215', specialization: 'Biology' },
  ];

  const teacherProfiles = [];
  for (const td of teacherData) {
    const user = await prisma.user.upsert({
      where: { email: td.email },
      update: {},
      create: {
        name: td.name,
        email: td.email,
        phone: td.phone,
        password: hashedPassword,
        role: 'teacher',
        isVerified: true,
      },
    });
    const profile = await prisma.teacherProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        specialization: td.specialization,
        status: td.name === 'Ms. Sarah James' ? 'inactive' : 'active',
      },
    });
    teacherProfiles.push(profile);
  }

  const [robertProfile, emilyProfile, jamesProfile, lisaProfile, davidProfile] = teacherProfiles;

  // ─── CLASSES ───────────────────────────────────────────────────
  const classData = [
    { grade: '10', section: 'A', teacherId: robertProfile.id, capacity: 30 },
    { grade: '10', section: 'B', teacherId: emilyProfile.id, capacity: 30 },
    { grade: '11', section: 'A', teacherId: jamesProfile.id, capacity: 25 },
    { grade: '11', section: 'B', teacherId: lisaProfile.id, capacity: 25 },
    { grade: '12', section: 'A', teacherId: davidProfile.id, capacity: 20 },
  ];

  const classes = [];
  for (const cd of classData) {
    const cls = await prisma.class.upsert({
      where: { grade_section: { grade: cd.grade, section: cd.section } },
      update: {},
      create: {
        grade: cd.grade,
        section: cd.section,
        classTeacherId: cd.teacherId,
        capacity: cd.capacity,
      },
    });
    classes.push(cls);
  }
  const [class10A, class10B, class11A] = classes;

  // ─── SUBJECT-TEACHER & SUBJECT-CLASS ───────────────────────────
  const stLinks = [
    { subjectId: math.id, teacherProfileId: robertProfile.id },
    { subjectId: physics.id, teacherProfileId: emilyProfile.id },
    { subjectId: english.id, teacherProfileId: jamesProfile.id },
    { subjectId: chemistry.id, teacherProfileId: lisaProfile.id },
    { subjectId: cs.id, teacherProfileId: davidProfile.id },
  ];

  for (const st of stLinks) {
    await prisma.subjectTeacher.upsert({
      where: { subjectId_teacherProfileId: st },
      update: {},
      create: st,
    });
  }

  // Link subjects to class 10A
  for (const subject of subjects) {
    await prisma.subjectClass.upsert({
      where: { subjectId_classId: { subjectId: subject.id, classId: class10A.id } },
      update: {},
      create: { subjectId: subject.id, classId: class10A.id },
    });
  }

  // ─── STUDENT USERS ─────────────────────────────────────────────
  const studentData = [
    { name: 'Rahul Sharma', email: 'student@r-education.com', phone: '9123456780', grade: '10', section: 'A', rollNumber: '001' },
    { name: 'Priya Patel', email: 'priya.patel@r-education.com', phone: '9123456781', grade: '10', section: 'A', rollNumber: '002' },
    { name: 'Amit Kumar', email: 'amit.kumar@r-education.com', phone: '9123456782', grade: '10', section: 'A', rollNumber: '003' },
    { name: 'Sneha Gupta', email: 'sneha.gupta@r-education.com', phone: '9123456783', grade: '10', section: 'A', rollNumber: '004' },
    { name: 'Vikram Singh', email: 'vikram.singh@r-education.com', phone: '9123456784', grade: '10', section: 'A', rollNumber: '005' },
    { name: 'Ananya Reddy', email: 'ananya.reddy@r-education.com', phone: '9123456785', grade: '10', section: 'B', rollNumber: '001' },
    { name: 'Karan Mehta', email: 'karan.mehta@r-education.com', phone: '9123456786', grade: '11', section: 'A', rollNumber: '001' },
  ];

  const studentProfiles = [];
  for (let i = 0; i < studentData.length; i++) {
    const sd = studentData[i];
    const user = await prisma.user.upsert({
      where: { email: sd.email },
      update: {},
      create: {
        name: sd.name,
        email: sd.email,
        phone: sd.phone,
        password: hashedPassword,
        role: 'student',
        isVerified: true,
      },
    });

    const classForStudent = classes.find((c) => c.grade === sd.grade && c.section === sd.section);
    const studentId = `STU${String(user.id).padStart(5, '0')}`;

    const profile = await prisma.studentProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        studentId,
        grade: sd.grade,
        section: sd.section,
        rollNumber: sd.rollNumber,
        gpa: 3.0 + Math.random(),
        classId: classForStudent?.id,
      },
    });
    studentProfiles.push(profile);
  }

  const [rahulProfile] = studentProfiles;

  // ─── PARENT USER ───────────────────────────────────────────────
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@r-education.com' },
    update: {},
    create: {
      name: 'Mrs. Sharma',
      email: 'parent@r-education.com',
      phone: '9876500000',
      password: hashedPassword,
      role: 'parent',
      isVerified: true,
    },
  });

  const parentProfile = await prisma.parentProfile.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: { userId: parentUser.id },
  });

  // Link parent to Rahul
  await prisma.parentStudent.upsert({
    where: {
      parentProfileId_studentProfileId: {
        parentProfileId: parentProfile.id,
        studentProfileId: rahulProfile.id,
      },
    },
    update: {},
    create: {
      parentProfileId: parentProfile.id,
      studentProfileId: rahulProfile.id,
    },
  });

  // ─── TIMETABLE ─────────────────────────────────────────────────
  const timetableSlots = [
    { classId: class10A.id, dayOfWeek: 1, startTime: '09:00', endTime: '10:00', subjectId: math.id, teacherName: 'Dr. Robert Smith', room: 'Room 101' },
    { classId: class10A.id, dayOfWeek: 1, startTime: '10:00', endTime: '11:00', subjectId: physics.id, teacherName: 'Ms. Emily Chen', room: 'Lab 1' },
    { classId: class10A.id, dayOfWeek: 1, startTime: '11:30', endTime: '12:30', subjectId: english.id, teacherName: 'Mr. James Wilson', room: 'Room 203' },
    { classId: class10A.id, dayOfWeek: 1, startTime: '14:00', endTime: '15:00', subjectId: chemistry.id, teacherName: 'Dr. Lisa Park', room: 'Lab 2' },
    { classId: class10A.id, dayOfWeek: 2, startTime: '09:00', endTime: '10:00', subjectId: cs.id, teacherName: 'Mr. David Brown', room: 'CS Lab' },
    { classId: class10A.id, dayOfWeek: 2, startTime: '10:00', endTime: '11:00', subjectId: math.id, teacherName: 'Dr. Robert Smith', room: 'Room 101' },
    { classId: class10A.id, dayOfWeek: 2, startTime: '11:30', endTime: '12:30', subjectId: biology.id, teacherName: 'Ms. Sarah James', room: 'Lab 3' },
    { classId: class10A.id, dayOfWeek: 3, startTime: '09:00', endTime: '10:00', subjectId: english.id, teacherName: 'Mr. James Wilson', room: 'Room 203' },
    { classId: class10A.id, dayOfWeek: 3, startTime: '10:00', endTime: '11:00', subjectId: physics.id, teacherName: 'Ms. Emily Chen', room: 'Lab 1' },
    { classId: class10A.id, dayOfWeek: 3, startTime: '11:30', endTime: '12:30', subjectId: math.id, teacherName: 'Dr. Robert Smith', room: 'Room 101' },
    { classId: class10A.id, dayOfWeek: 4, startTime: '09:00', endTime: '10:00', subjectId: chemistry.id, teacherName: 'Dr. Lisa Park', room: 'Lab 2' },
    { classId: class10A.id, dayOfWeek: 4, startTime: '10:00', endTime: '11:00', subjectId: cs.id, teacherName: 'Mr. David Brown', room: 'CS Lab' },
    { classId: class10A.id, dayOfWeek: 5, startTime: '09:00', endTime: '10:00', subjectId: math.id, teacherName: 'Dr. Robert Smith', room: 'Room 101' },
    { classId: class10A.id, dayOfWeek: 5, startTime: '10:00', endTime: '11:00', subjectId: english.id, teacherName: 'Mr. James Wilson', room: 'Room 203' },
  ];

  for (const slot of timetableSlots) {
    await prisma.timetableSlot.create({ data: slot });
  }

  // ─── TESTS ─────────────────────────────────────────────────────
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDate2 = new Date();
  futureDate2.setDate(futureDate2.getDate() + 14);

  const test1 = await prisma.test.create({
    data: {
      title: 'Mathematics Mid-Term',
      subjectId: math.id,
      grade: '10',
      date: futureDate,
      duration: 60,
      totalMarks: 50,
      type: 'mid_term',
      status: 'active',
      questions: {
        create: [
          { text: 'What is the derivative of x²?', type: 'mcq', options: ['2x', 'x²', '2', 'x'], marks: 5, correctAnswer: '2x' },
          { text: 'Solve: 2x + 5 = 15', type: 'mcq', options: ['5', '10', '7.5', '3'], marks: 5, correctAnswer: '5' },
          { text: 'What is the integral of 3x²?', type: 'mcq', options: ['x³', '3x³', 'x³ + C', '6x'], marks: 5, correctAnswer: 'x³ + C' },
          { text: 'Define a quadratic equation.', type: 'short', options: [], marks: 10 },
          { text: 'Explain the Pythagorean theorem with proof.', type: 'long', options: [], marks: 25 },
        ],
      },
    },
  });

  const test2 = await prisma.test.create({
    data: {
      title: 'Physics Quiz',
      subjectId: physics.id,
      grade: '10',
      date: futureDate2,
      duration: 30,
      totalMarks: 25,
      type: 'quiz',
      status: 'active',
      questions: {
        create: [
          { text: 'What is the SI unit of force?', type: 'mcq', options: ['Newton', 'Joule', 'Watt', 'Pascal'], marks: 5, correctAnswer: 'Newton' },
          { text: 'State Newton\'s first law of motion.', type: 'short', options: [], marks: 10 },
          { text: 'Describe the concept of gravitational potential energy.', type: 'long', options: [], marks: 10 },
        ],
      },
    },
  });

  // Past test with submission for Rahul
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 30);

  const pastTest = await prisma.test.create({
    data: {
      title: 'Chemistry Unit Test',
      subjectId: chemistry.id,
      grade: '10',
      date: pastDate,
      duration: 45,
      totalMarks: 30,
      type: 'unit_test',
      status: 'graded',
      questions: {
        create: [
          { text: 'What is the chemical formula for water?', type: 'mcq', options: ['H2O', 'CO2', 'NaCl', 'O2'], marks: 5, correctAnswer: 'H2O' },
          { text: 'Define pH.', type: 'short', options: [], marks: 10 },
          { text: 'Explain the process of electrolysis.', type: 'long', options: [], marks: 15 },
        ],
      },
    },
  });

  await prisma.testSubmission.create({
    data: {
      testId: pastTest.id,
      studentProfileId: rahulProfile.id,
      score: 25,
      percentage: 83,
      grade: 'A',
      feedback: 'Excellent work on the theoretical sections.',
    },
  });

  // ─── ASSIGNMENTS ───────────────────────────────────────────────
  const assignmentDeadline1 = new Date();
  assignmentDeadline1.setDate(assignmentDeadline1.getDate() + 5);
  const assignmentDeadline2 = new Date();
  assignmentDeadline2.setDate(assignmentDeadline2.getDate() + 10);
  const pastDeadline = new Date();
  pastDeadline.setDate(pastDeadline.getDate() - 5);

  await prisma.assignment.createMany({
    data: [
      { title: 'Calculus Problem Set', subjectId: math.id, grade: '10', deadline: assignmentDeadline1, status: 'active', totalMarks: 50 },
      { title: 'Newton\'s Laws Lab Report', subjectId: physics.id, grade: '10', deadline: assignmentDeadline2, status: 'active', totalMarks: 40 },
      { title: 'Essay: Shakespeare\'s Hamlet', subjectId: english.id, grade: '10', deadline: pastDeadline, status: 'graded', totalMarks: 30 },
      { title: 'Periodic Table Worksheet', subjectId: chemistry.id, grade: '10', deadline: assignmentDeadline1, status: 'active', totalMarks: 25 },
    ],
  });

  // ─── ATTENDANCE (last 5 days for class 10A students) ───────────
  const class10AStudents = studentProfiles.filter((s) => s.grade === '10' && s.section === 'A');
  const robertUser = await prisma.user.findFirst({ where: { email: 'teacher@r-education.com' } });

  for (let dayOffset = 1; dayOffset <= 5; dayOffset++) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(0, 0, 0, 0);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    for (const student of class10AStudents) {
      const statuses: ('present' | 'absent' | 'late')[] = ['present', 'present', 'present', 'present', 'late', 'absent'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      await prisma.attendance.upsert({
        where: {
          studentProfileId_classId_date: {
            studentProfileId: student.id,
            classId: class10A.id,
            date,
          },
        },
        update: {},
        create: {
          studentProfileId: student.id,
          classId: class10A.id,
          date,
          status: randomStatus,
          markedById: robertUser!.id,
        },
      });
    }
  }

  // ─── DAILY PROGRESS (for Rahul, today) ─────────────────────────
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.dailyProgress.upsert({
    where: {
      studentProfileId_date: {
        studentProfileId: rahulProfile.id,
        date: today,
      },
    },
    update: {},
    create: {
      studentProfileId: rahulProfile.id,
      classId: class10A.id,
      date: today,
      attendance: 'present',
      classesAttended: 4,
      totalClasses: 5,
      tasksCompleted: 3,
      totalTasks: 5,
      homeworkStatus: 'done',
      todayRating: 4,
      teacherRemark: 'Good participation in class today. Keep it up!',
      behaviorNote: 'Helped classmates with math problems.',
      reportedById: robertProfile.id,
    },
  });

  // ─── MEETINGS ──────────────────────────────────────────────────
  const meetingDate = new Date();
  meetingDate.setDate(meetingDate.getDate() + 2);

  await prisma.meeting.createMany({
    data: [
      {
        title: 'Algebra Doubt Session',
        type: 'doubt_session',
        date: meetingDate,
        time: '14:00',
        duration: 45,
        grade: '10',
        participants: ['students'],
        status: 'scheduled',
        teacherProfileId: robertProfile.id,
      },
      {
        title: 'Physics Live Class',
        type: 'live_class',
        date: meetingDate,
        time: '16:00',
        duration: 60,
        grade: '10',
        participants: ['students'],
        status: 'scheduled',
        teacherProfileId: emilyProfile.id,
      },
      {
        title: 'Parent-Teacher Meeting',
        type: 'ptm',
        date: new Date(meetingDate.getTime() + 86400000 * 5),
        time: '10:00',
        duration: 90,
        grade: '10',
        participants: ['students', 'parents'],
        status: 'scheduled',
        teacherProfileId: robertProfile.id,
      },
    ],
  });

  // ─── CHAT GROUPS ───────────────────────────────────────────────
  const chatGroups = await Promise.all([
    prisma.chatGroup.create({ data: { name: 'Grade 10 - Section A' } }),
    prisma.chatGroup.create({ data: { name: 'Mathematics Group' } }),
    prisma.chatGroup.create({ data: { name: 'Physics Group' } }),
    prisma.chatGroup.create({ data: { name: 'English Group' } }),
  ]);

  // Add Rahul to all chat groups
  const rahulUser = await prisma.user.findFirst({ where: { email: 'student@r-education.com' } });
  for (const group of chatGroups) {
    await prisma.chatGroupMember.create({
      data: { chatGroupId: group.id, userId: rahulUser!.id },
    });
  }

  // Add teachers to relevant groups
  await prisma.chatGroupMember.create({
    data: { chatGroupId: chatGroups[0].id, userId: robertUser!.id },
  });
  await prisma.chatGroupMember.create({
    data: { chatGroupId: chatGroups[1].id, userId: robertUser!.id },
  });

  // Add sample messages
  await prisma.message.createMany({
    data: [
      { chatGroupId: chatGroups[1].id, senderId: robertUser!.id, content: 'Welcome to the Mathematics study group! Feel free to ask doubts here.' },
      { chatGroupId: chatGroups[1].id, senderId: rahulUser!.id, content: 'Thank you sir! Can you explain integration by parts?' },
      { chatGroupId: chatGroups[1].id, senderId: robertUser!.id, content: 'Sure! Integration by parts uses the formula: ∫u dv = uv - ∫v du' },
    ],
  });

  // ─── NOTIFICATIONS ─────────────────────────────────────────────
  await prisma.notification.createMany({
    data: [
      { userId: rahulUser!.id, message: 'Your Chemistry Unit Test result is out! You scored 83%', type: 'result' },
      { userId: rahulUser!.id, message: 'Mathematics Mid-Term exam scheduled for next week', type: 'reminder' },
      { userId: rahulUser!.id, message: 'New assignment: Calculus Problem Set - Due in 5 days', type: 'assignment' },
      { userId: rahulUser!.id, message: 'Parent-Teacher Meeting scheduled for next week', type: 'announcement' },
      { userId: rahulUser!.id, message: 'Physics Quiz will be held in 2 weeks', type: 'reminder' },
    ],
  });

  // ─── EVENTS ────────────────────────────────────────────────────
  const eventDate1 = new Date();
  eventDate1.setDate(eventDate1.getDate() + 10);
  const eventDate2 = new Date();
  eventDate2.setDate(eventDate2.getDate() + 20);

  await prisma.event.createMany({
    data: [
      { title: 'Science Fair', date: eventDate1, type: 'cultural_event', grade: '10', description: 'Annual inter-school science exhibition', createdById: adminUser.id },
      { title: 'Field Trip to Museum', date: eventDate2, type: 'trip', grade: '10', description: 'Educational trip to National Science Museum', requiresPermission: true, createdById: adminUser.id },
      { title: 'Sports Day', date: new Date(eventDate2.getTime() + 86400000 * 10), type: 'cultural_event', grade: '10', description: 'Annual sports competition', createdById: adminUser.id },
    ],
  });

  // ─── FEES ──────────────────────────────────────────────────────
  await prisma.fee.createMany({
    data: [
      { studentProfileId: rahulProfile.id, term: 'Term 1 (Apr-Jul)', amount: 15000, status: 'paid', paidDate: new Date('2025-04-15'), dueDate: new Date('2025-04-30') },
      { studentProfileId: rahulProfile.id, term: 'Term 2 (Aug-Nov)', amount: 15000, status: 'paid', paidDate: new Date('2025-08-10'), dueDate: new Date('2025-08-31') },
      { studentProfileId: rahulProfile.id, term: 'Term 3 (Dec-Mar)', amount: 15000, status: 'pending', dueDate: new Date('2025-12-31') },
    ],
  });

  // ─── ANNOUNCEMENTS ─────────────────────────────────────────────
  await prisma.announcement.createMany({
    data: [
      { title: 'Winter Break Schedule', message: 'School will be closed from Dec 25 to Jan 5. Happy holidays!', sentById: adminUser.id, targetAudience: 'all', type: 'school' },
      { title: 'Annual Day Preparations', message: 'Students interested in performing please register with your class teacher.', sentById: adminUser.id, targetAudience: 'students', type: 'school' },
      { title: 'Mid-Term Exam Schedule Released', message: 'Please check the notice board for detailed exam schedule.', sentById: robertUser!.id, targetAudience: 'students', type: 'teacher' },
    ],
  });

  // ─── AUDIT LOG ─────────────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      { action: 'Teacher Added', userId: adminUser.id, details: 'Dr. Robert Smith appointed as Mathematics teacher', type: 'teacher' },
      { action: 'Class Created', userId: adminUser.id, details: 'Grade 10 - Section A created with capacity 30', type: 'class_action' },
      { action: 'Student Enrolled', userId: adminUser.id, details: 'Rahul Sharma enrolled in Grade 10-A', type: 'student' },
      { action: 'Announcement Sent', userId: adminUser.id, details: 'Winter Break Schedule broadcast to all users', type: 'announcement' },
      { action: 'Academic Year Updated', userId: adminUser.id, details: 'Academic year set to 2025-2026', type: 'system' },
      { action: 'Grading Scale Modified', userId: adminUser.id, details: 'Updated grading scale with A+ tier at 90%', type: 'system' },
    ],
  });

  console.log('Seed completed successfully!');
  console.log('\nLogin credentials:');
  console.log('  Student: student@r-education.com / password123');
  console.log('  Teacher: teacher@r-education.com / password123');
  console.log('  Parent:  parent@r-education.com / password123');
  console.log('  Admin:   admin@r-education.com / password123');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
