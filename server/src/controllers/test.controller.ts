import { Request, Response, NextFunction } from 'express';
import * as testService from '../services/test.service';

export const getTestQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testId = parseInt(req.params.id, 10);
    const data = await testService.getTestQuestions(testId);
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'Test not found') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};

export const submitTest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testId = parseInt(req.params.id, 10);
    const studentProfileId = req.user!.studentProfile!.id;
    const { answers } = req.body;
    const data = await testService.submitTest(testId, studentProfileId, answers);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getTestResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testId = parseInt(req.params.id, 10);
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await testService.getTestResult(testId, studentProfileId);
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'Test result not found') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};
