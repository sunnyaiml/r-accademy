import prisma from '../config/database';
import { AttendanceStatus } from '@prisma/client';

export const markAttendance = async (
  classId: number,
  date: string,
  students: { id: number; status: AttendanceStatus }[],
  markedById: number
) => {
  const attendanceDate = new Date(date);

  const records = await Promise.all(
    students.map((s) =>
      prisma.attendance.upsert({
        where: {
          studentProfileId_classId_date: {
            studentProfileId: s.id,
            classId,
            date: attendanceDate,
          },
        },
        update: { status: s.status, markedById },
        create: {
          studentProfileId: s.id,
          classId,
          date: attendanceDate,
          status: s.status,
          markedById,
        },
        include: {
          studentProfile: { include: { user: true } },
          class: true,
          markedBy: true,
        },
      })
    )
  );

  return {
    classId,
    className: records[0]?.class?.grade
      ? `Grade ${records[0].class.grade} - Section ${records[0].class.section}`
      : '',
    date,
    totalStudents: students.length,
    present: students.filter((s) => s.status === 'present').length,
    absent: students.filter((s) => s.status === 'absent').length,
    late: students.filter((s) => s.status === 'late').length,
    records: records.map(formatRecord),
  };
};

export const getTodayAttendance = async (classId: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  const records = await prisma.attendance.findMany({
    where: { classId, date: today },
    include: {
      studentProfile: { include: { user: true } },
      class: true,
      markedBy: true,
    },
  });

  const totalStudents = await prisma.studentProfile.count({ where: { classId } });

  return {
    classId,
    className: cls ? `Grade ${cls.grade} - Section ${cls.section}` : '',
    date: today.toISOString().split('T')[0],
    totalStudents,
    present: records.filter((r) => r.status === 'present').length,
    absent: records.filter((r) => r.status === 'absent').length,
    late: records.filter((r) => r.status === 'late').length,
    records: records.map(formatRecord),
  };
};

export const getClassAttendanceStats = async (classId: number) => {
  const students = await prisma.studentProfile.findMany({
    where: { classId },
    include: { user: true },
  });

  const stats = await Promise.all(
    students.map(async (student) => {
      const records = await prisma.attendance.findMany({
        where: { studentProfileId: student.id, classId },
        include: {
          studentProfile: { include: { user: true } },
          class: true,
          markedBy: true,
        },
        orderBy: { date: 'desc' },
      });

      const totalClasses = records.length;
      const present = records.filter((r) => r.status === 'present').length;
      const absent = records.filter((r) => r.status === 'absent').length;
      const late = records.filter((r) => r.status === 'late').length;

      return {
        studentId: student.id,
        studentName: student.user.name,
        totalClasses,
        present,
        absent,
        late,
        attendancePercentage: totalClasses > 0 ? Math.round((present / totalClasses) * 100) : 0,
        recentRecords: records.slice(0, 5).map(formatRecord),
      };
    })
  );

  return stats;
};

export const getClassAttendance = async (classId: number, startDate?: string, endDate?: string) => {
  const where: any = { classId };
  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate);
    if (endDate) where.date.lte = new Date(endDate);
  }

  const records = await prisma.attendance.findMany({
    where,
    include: {
      studentProfile: { include: { user: true } },
      class: true,
      markedBy: true,
    },
    orderBy: { date: 'desc' },
  });

  return records.map(formatRecord);
};

export const getStudentAttendance = async (studentId: number, startDate?: string, endDate?: string) => {
  const where: any = { studentProfileId: studentId };
  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate);
    if (endDate) where.date.lte = new Date(endDate);
  }

  const records = await prisma.attendance.findMany({
    where,
    include: {
      studentProfile: { include: { user: true } },
      class: true,
      markedBy: true,
    },
    orderBy: { date: 'desc' },
  });

  return records.map(formatRecord);
};

export const updateAttendance = async (recordId: number, status: AttendanceStatus) => {
  const record = await prisma.attendance.update({
    where: { id: recordId },
    data: { status },
    include: {
      studentProfile: { include: { user: true } },
      class: true,
      markedBy: true,
    },
  });

  return formatRecord(record);
};

export const deleteAttendance = async (recordId: number) => {
  await prisma.attendance.delete({ where: { id: recordId } });
  return { message: 'Attendance record deleted' };
};

function formatRecord(record: any) {
  return {
    id: record.id,
    studentId: record.studentProfileId,
    studentName: record.studentProfile.user.name,
    classId: record.classId,
    className: `Grade ${record.class.grade} - Section ${record.class.section}`,
    date: record.date.toISOString().split('T')[0],
    status: record.status,
    markedBy: record.markedById,
    markedByName: record.markedBy.name,
    createdAt: record.createdAt.toISOString(),
  };
}
