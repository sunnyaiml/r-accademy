import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as studentController from '../controllers/student.controller';

const router = Router();

router.use(authenticate, requireRole('student'));

router.get('/me/subjects', studentController.getSubjects);
router.get('/me/tests', studentController.getTests);
router.get('/me/meetings', studentController.getMeetings);
router.get('/me/assignments', studentController.getAssignments);
router.get('/me/timetable', studentController.getTimetable);
router.get('/me/notifications', studentController.getNotifications);
router.patch('/me/notifications/:id/read', studentController.markNotificationRead);
router.get('/me/performance', studentController.getPerformance);
router.get('/me/daily-progress', studentController.getDailyProgress);

export default router;
