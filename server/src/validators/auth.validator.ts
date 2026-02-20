import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'teacher', 'parent']).optional().default('student'),
  studentId: z.string().optional(), // For parent registration (child's student ID)
  specialization: z.string().optional(), // For teacher registration
});

export const sendOtpSchema = z.object({
  contact: z.string().min(1, 'Contact is required'),
});

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  role: z.string().optional(),
  studentId: z.string().optional(),
  specialization: z.string().optional(),
});
