import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/admin.service';

export const getTeachers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getTeachers();
    return res.json(data);
  } catch (err) { next(err); }
};

export const appointTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.appointTeacher(req.body);
    return res.status(201).json(data);
  } catch (err) { next(err); }
};

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await adminService.updateTeacher(id, req.body);
    return res.json(data);
  } catch (err) { next(err); }
};

export const getStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getStudents();
    return res.json(data);
  } catch (err) { next(err); }
};

export const enrollStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.enrollStudent(req.body);
    return res.status(201).json(data);
  } catch (err) { next(err); }
};

export const getClasses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getClasses();
    return res.json(data);
  } catch (err) { next(err); }
};

export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.createClass(req.body);
    return res.status(201).json(data);
  } catch (err) { next(err); }
};

export const promoteStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { grade, section } = req.body;
    const data = await adminService.promoteStudents(grade, section);
    return res.json(data);
  } catch (err) { next(err); }
};

export const getConfig = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getConfig();
    return res.json(data);
  } catch (err) { next(err); }
};

export const updateConfig = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { key, value } = req.body;
    const data = await adminService.updateConfig(key, value);
    return res.json(data);
  } catch (err) { next(err); }
};

export const getAuditLog = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getAuditLog();
    return res.json(data);
  } catch (err) { next(err); }
};

export const getAnalytics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.getAnalytics();
    return res.json(data);
  } catch (err) { next(err); }
};

export const broadcastAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await adminService.broadcastAnnouncement(req.user!.id, req.body);
    return res.status(201).json(data);
  } catch (err) { next(err); }
};
