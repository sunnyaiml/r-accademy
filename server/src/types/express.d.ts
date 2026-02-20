import { User, StudentProfile, TeacherProfile, ParentProfile } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User & {
        studentProfile?: StudentProfile | null;
        teacherProfile?: TeacherProfile | null;
        parentProfile?: ParentProfile | null;
      };
    }
  }
}
