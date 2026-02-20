import { Router } from 'express';
import authRoutes from './auth.routes';
import studentRoutes from './student.routes';
import teacherRoutes from './teacher.routes';
import attendanceRoutes from './attendance.routes';
import testRoutes from './test.routes';
import assignmentRoutes from './assignment.routes';
import meetingRoutes from './meeting.routes';
import chatRoutes from './chat.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/tests', testRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/meetings', meetingRoutes);
router.use('/chat', chatRoutes);
router.use('/admin', adminRoutes);

export default router;
