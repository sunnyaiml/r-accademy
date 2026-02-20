import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import { upload } from '../middleware/upload';
import * as assignmentController from '../controllers/assignment.controller';

const router = Router();

router.use(authenticate, requireRole('student'));

router.post('/:id/submit', upload.single('file'), assignmentController.submitAssignment);
router.get('/:id/submission', assignmentController.getSubmission);

export default router;
