import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.json(result);
  } catch (err: any) {
    if (err.message === 'Invalid email or password') {
      return res.status(401).json({ message: err.message });
    }
    next(err);
  }
};

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    return res.status(201).json(result);
  } catch (err: any) {
    if (err.message === 'Email already registered') {
      return res.status(409).json({ message: err.message });
    }
    next(err);
  }
};

export const sendOtpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contact } = req.body;
    const result = await authService.sendOtp(contact);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

export const verifyOtpHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.verifyOtpAndActivate(req.body);
    return res.json(result);
  } catch (err: any) {
    if (err.message === 'Invalid or expired OTP') {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
};
