import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as testController from '../controllers/test.controller';

const router = Router();

router.use(authenticate);

router.get('/:id/questions', testController.getTestQuestions);
router.post('/:id/submit', requireRole('student'), testController.submitTest);
router.get('/:id/result', requireRole('student'), testController.getTestResult);

export default router;
