import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roleGuard';
import * as chatController from '../controllers/chat.controller';

const router = Router();

router.use(authenticate);

router.get('/groups/:id/messages', chatController.getMessages);
router.post('/groups/:id/messages', chatController.sendMessage);
router.delete('/messages/:id', requireRole('teacher'), chatController.deleteMessage);

export default router;
