import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as attendanceController from '../controllers/attendance.controller';

const router = Router();

router.use(authenticate);

router.post('/', requireRole('teacher'), attendanceController.markAttendance);
router.get('/class/:classId/today', requireRole('teacher'), attendanceController.getTodayAttendance);
router.get('/class/:classId/stats', requireRole('teacher'), attendanceController.getClassAttendanceStats);
router.get('/class/:classId', requireRole('teacher'), attendanceController.getClassAttendance);
router.get('/student/:studentId', attendanceController.getStudentAttendance);
router.patch('/:recordId', requireRole('teacher'), attendanceController.updateAttendance);
router.delete('/:recordId', requireRole('teacher'), attendanceController.deleteAttendance);

export default router;
