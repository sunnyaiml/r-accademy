import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[Error]', err.message);

  if (err.name === 'ZodError') {
    return res.status(400).json({ message: 'Validation error', errors: (err as any).errors });
  }

  return res.status(500).json({ message: err.message || 'Internal server error' });
};

export const notFound = (_req: Request, res: Response) => {
  return res.status(404).json({ message: 'Route not found' });
};
