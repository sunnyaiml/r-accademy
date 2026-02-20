import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as teacherController from '../controllers/teacher.controller';

const router = Router();

router.use(authenticate, requireRole('teacher'));

router.get('/me/classes', teacherController.getClasses);
router.get('/me/meetings', teacherController.getMeetings);

export default router;
