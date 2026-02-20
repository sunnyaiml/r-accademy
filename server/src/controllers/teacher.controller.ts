import { Request, Response, NextFunction } from 'express';
import * as teacherService from '../services/teacher.service';

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherProfileId = req.user!.teacherProfile!.id;
    const data = await teacherService.getClasses(teacherProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getMeetings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacherProfileId = req.user!.teacherProfile!.id;
    const data = await teacherService.getMeetings(teacherProfileId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
