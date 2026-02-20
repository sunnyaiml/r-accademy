import { Request, Response, NextFunction } from 'express';
import * as chatService from '../services/chat.service';

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id, 10);
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const data = await chatService.getMessages(groupId, limit, offset);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const groupId = parseInt(req.params.id, 10);
    const { content } = req.body;
    const data = await chatService.sendMessage(groupId, req.user!.id, content);

    // Emit via Socket.io if available
    const io = req.app.get('io');
    if (io) {
      io.to(`chat:${groupId}`).emit('new_message', data);
    }

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messageId = parseInt(req.params.id, 10);
    await chatService.deleteMessage(messageId);

    // Emit via Socket.io if available
    const io = req.app.get('io');
    if (io) {
      io.emit('message_deleted', messageId);
    }

    return res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
