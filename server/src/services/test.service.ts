import prisma from '../config/database';

export const getTestQuestions = async (testId: number) => {
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: { questions: true },
  });

  if (!test) throw new Error('Test not found');

  return {
    testId: test.id,
    title: test.title,
    duration: test.duration,
    totalMarks: test.totalMarks,
    questions: test.questions.map((q) => ({
      id: q.id,
      text: q.text,
      type: q.type,
      options: q.options,
      marks: q.marks,
    })),
  };
};

export const submitTest = async (
  testId: number,
  studentProfileId: number,
  answers: Record<string, any>
) => {
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: { questions: true },
  });

  if (!test) throw new Error('Test not found');

  // Auto-grade MCQ questions
  let score = 0;
  const testAnswers: { questionId: number; answer: string; isCorrect: boolean }[] = [];

  for (const question of test.questions) {
    const studentAnswer = answers[String(question.id)] || '';
    let isCorrect = false;

    if (question.type === 'mcq' && question.correctAnswer) {
      isCorrect = String(studentAnswer).toLowerCase() === question.correctAnswer.toLowerCase();
      if (isCorrect) score += question.marks;
    }

    testAnswers.push({
      questionId: question.id,
      answer: String(studentAnswer),
      isCorrect,
    });
  }

  const percentage = Math.round((score / test.totalMarks) * 100);
  const grade = getGrade(percentage);

  const submission = await prisma.testSubmission.create({
    data: {
      testId,
      studentProfileId,
      score,
      percentage,
      grade,
      answers: {
        create: testAnswers,
      },
    },
  });

  return {
    id: submission.id,
    testId,
    score: `${score}/${test.totalMarks}`,
    percentage,
    grade,
    message: 'Test submitted successfully',
  };
};

export const getTestResult = async (testId: number, studentProfileId: number) => {
  const submission = await prisma.testSubmission.findUnique({
    where: {
      testId_studentProfileId: { testId, studentProfileId },
    },
    include: {
      answers: { include: { question: true } },
      test: true,
    },
  });

  if (!submission) throw new Error('Test result not found');

  const correctAnswers: Record<number, any> = {};
  for (const answer of submission.answers) {
    if (answer.question.correctAnswer) {
      correctAnswers[answer.questionId] = answer.question.correctAnswer;
    }
  }

  return {
    id: submission.id,
    testId: submission.testId,
    score: `${submission.score}/${submission.test.totalMarks}`,
    percentage: submission.percentage || 0,
    grade: submission.grade || 'N/A',
    correctAnswers,
    feedback: submission.feedback,
  };
};

function getGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}
