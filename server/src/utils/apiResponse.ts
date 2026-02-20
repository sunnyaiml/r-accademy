import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

export const sendError = (res: Response, message: string, statusCode = 400) => {
  return res.status(statusCode).json({ message });
};

export const sendCreated = (res: Response, data: any) => {
  return res.status(201).json(data);
};
