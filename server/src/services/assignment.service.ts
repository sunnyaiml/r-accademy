import prisma from '../config/database';

export const submitAssignment = async (
  assignmentId: number,
  studentProfileId: number,
  fileName: string,
  fileUrl: string,
  notes?: string
) => {
  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment) throw new Error('Assignment not found');

  const submission = await prisma.assignmentSubmission.upsert({
    where: {
      assignmentId_studentProfileId: { assignmentId, studentProfileId },
    },
    update: { fileName, fileUrl, notes, submittedAt: new Date() },
    create: {
      assignmentId,
      studentProfileId,
      fileName,
      fileUrl,
      notes,
    },
  });

  return {
    id: submission.id,
    assignmentId: submission.assignmentId,
    studentId: String(studentProfileId),
    fileName: submission.fileName,
    fileUrl: submission.fileUrl,
    notes: submission.notes,
    submittedAt: submission.submittedAt.toISOString(),
  };
};

export const getSubmission = async (assignmentId: number, studentProfileId: number) => {
  const submission = await prisma.assignmentSubmission.findUnique({
    where: {
      assignmentId_studentProfileId: { assignmentId, studentProfileId },
    },
  });

  if (!submission) throw new Error('Submission not found');

  return {
    id: submission.id,
    assignmentId: submission.assignmentId,
    studentId: String(studentProfileId),
    fileName: submission.fileName,
    fileUrl: submission.fileUrl,
    notes: submission.notes,
    submittedAt: submission.submittedAt.toISOString(),
  };
};
