import prisma from '../config/database';
import { MeetingType } from '@prisma/client';

export const createMeeting = async (
  teacherProfileId: number,
  data: {
    title: string;
    type: MeetingType;
    date: string;
    time: string;
    duration: number;
    grade: string;
    participants: string[];
    subject?: string;
  }
) => {
  const meeting = await prisma.meeting.create({
    data: {
      title: data.title,
      type: data.type,
      date: new Date(data.date),
      time: data.time,
      duration: data.duration,
      grade: data.grade,
      participants: data.participants,
      subject: data.subject,
      teacherProfileId,
    },
    include: { teacherProfile: { include: { user: true } } },
  });

  return {
    id: meeting.id,
    title: meeting.title,
    type: meeting.type,
    date: meeting.date.toISOString().split('T')[0],
    time: meeting.time,
    duration: meeting.duration,
    grade: meeting.grade,
    participants: meeting.participants,
    status: meeting.status,
    meetingUrl: meeting.meetingUrl,
    teacherId: meeting.teacherProfileId,
    teacherName: meeting.teacherProfile.user.name,
  };
};

export const startMeeting = async (meetingId: number) => {
  const meetingUrl = `https://meet.jit.si/r-education-${meetingId}`;

  const meeting = await prisma.meeting.update({
    where: { id: meetingId },
    data: { status: 'active', meetingUrl },
  });

  return { meetingUrl, status: meeting.status };
};

export const updateMeeting = async (meetingId: number, updates: any) => {
  const meeting = await prisma.meeting.update({
    where: { id: meetingId },
    data: {
      ...(updates.title && { title: updates.title }),
      ...(updates.date && { date: new Date(updates.date) }),
      ...(updates.time && { time: updates.time }),
      ...(updates.duration && { duration: updates.duration }),
      ...(updates.status && { status: updates.status }),
    },
  });

  return meeting;
};

export const deleteMeeting = async (meetingId: number) => {
  await prisma.meeting.delete({ where: { id: meetingId } });
  return { message: 'Meeting deleted' };
};

export const getMeetingParticipants = async (meetingId: number) => {
  const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
  if (!meeting) throw new Error('Meeting not found');

  const students = await prisma.studentProfile.findMany({
    where: { grade: meeting.grade },
    include: { user: true },
  });

  return students.map((s) => ({
    id: s.id,
    name: s.user.name,
    role: 'student',
  }));
};
