import { Request, Response, NextFunction } from 'express';
import * as meetingService from '../services/meeting.service';

export const createMeeting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherProfileId = req.user!.teacherProfile!.id;
    const data = await meetingService.createMeeting(teacherProfileId, req.body);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const startMeeting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meetingId = parseInt(req.params.id, 10);
    const data = await meetingService.startMeeting(meetingId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const updateMeeting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meetingId = parseInt(req.params.id, 10);
    const data = await meetingService.updateMeeting(meetingId, req.body);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteMeeting = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meetingId = parseInt(req.params.id, 10);
    const data = await meetingService.deleteMeeting(meetingId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getMeetingParticipants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const meetingId = parseInt(req.params.id, 10);
    const data = await meetingService.getMeetingParticipants(meetingId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
