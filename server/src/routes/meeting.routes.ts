import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as meetingController from '../controllers/meeting.controller';

const router = Router();

router.use(authenticate, requireRole('teacher'));

router.post('/', meetingController.createMeeting);
router.post('/:id/start', meetingController.startMeeting);
router.patch('/:id', meetingController.updateMeeting);
router.delete('/:id', meetingController.deleteMeeting);
router.get('/:id/participants', meetingController.getMeetingParticipants);

export default router;
