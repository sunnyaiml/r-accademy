import { Request, Response, NextFunction } from 'express';
import * as assignmentService from '../services/assignment.service';

export const submitAssignment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignmentId = parseInt(req.params.id, 10);
    const studentProfileId = req.user!.studentProfile!.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const fileUrl = `/uploads/${file.filename}`;
    const data = await assignmentService.submitAssignment(
      assignmentId,
      studentProfileId,
      file.originalname,
      fileUrl,
      req.body.notes
    );
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getSubmission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignmentId = parseInt(req.params.id, 10);
    const studentProfileId = req.user!.studentProfile!.id;
    const data = await assignmentService.getSubmission(assignmentId, studentProfileId);
    return res.json(data);
  } catch (err: any) {
    if (err.message === 'Submission not found') {
      return res.status(404).json({ message: err.message });
    }
    next(err);
  }
};
