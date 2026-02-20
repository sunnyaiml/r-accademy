import { Request, Response, NextFunction } from 'express';
import * as studentService from '../services/student.service';

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await studentService.getSubjects(studentProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getTests = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const status = (req.query.status as string) || 'upcoming';
    const data = await studentService.getTests(studentProfileId, status);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getMeetings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await studentService.getMeetings(studentProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await studentService.getAssignments(studentProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getTimetable = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const date = req.query.date as string | undefined;
    const data = await studentService.getTimetable(studentProfileId, date);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await studentService.getNotifications(req.user!.id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const markNotificationRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await studentService.markNotificationRead(id, req.user!.id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getPerformance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await studentService.getPerformance(studentProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getDailyProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await studentService.getDailyProgress(studentProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
