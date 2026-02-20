import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendance.service';

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classId, date, students } = req.body;
    const data = await attendanceService.markAttendance(classId, date, students, req.user!.id);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

export const getTodayAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = parseInt(req.params.classId, 10);
    const data = await attendanceService.getTodayAttendance(classId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getClassAttendanceStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = parseInt(req.params.classId, 10);
    const data = await attendanceService.getClassAttendanceStats(classId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getClassAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = parseInt(req.params.classId, 10);
    const { start, end } = req.query;
    const data = await attendanceService.getClassAttendance(classId, start as string, end as string);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getStudentAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = parseInt(req.params.studentId, 10);
    const { start, end } = req.query;
    const data = await attendanceService.getStudentAttendance(studentId, start as string, end as string);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const updateAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordId = parseInt(req.params.recordId, 10);
    const { status } = req.body;
    const data = await attendanceService.updateAttendance(recordId, status);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const deleteAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recordId = parseInt(req.params.recordId, 10);
    const data = await attendanceService.deleteAttendance(recordId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};
