import prisma from '../config/database';

export const getClasses = async (teacherProfileId: number) => {
  // Get classes where teacher is assigned via SubjectTeacher
  const subjectTeachers = await prisma.subjectTeacher.findMany({
    where: { teacherProfileId },
    include: {
      subject: {
        include: {
          classes: {
            include: {
              class: {
                include: {
                  students: {
                    include: { user: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const classMap = new Map<number, any>();

  for (const st of subjectTeachers) {
    for (const sc of st.subject.classes) {
      const cls = sc.class;
      if (!classMap.has(cls.id)) {
        classMap.set(cls.id, {
          id: cls.id,
          name: `Grade ${cls.grade} - Section ${cls.section}`,
          grade: cls.grade,
          subject: st.subject.name,
          students: cls.students.map((s) => ({
            id: s.id,
            name: s.user.name,
            rollNumber: s.rollNumber,
            profilePicture: s.user.profilePicture,
          })),
        });
      }
    }
  }

  return Array.from(classMap.values());
};

export const getMeetings = async (teacherProfileId: number) => {
  const meetings = await prisma.meeting.findMany({
    where: { teacherProfileId },
    orderBy: { date: 'desc' },
  });

  return meetings.map((m) => ({
    id: m.id,
    title: m.title,
    type: m.type,
    date: m.date.toISOString().split('T')[0],
    time: m.time,
    duration: m.duration,
    grade: m.grade,
    participants: m.participants,
    status: m.status,
    meetingUrl: m.meetingUrl,
  }));
};
