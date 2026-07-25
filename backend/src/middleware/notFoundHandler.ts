import { Request, Response } from 'express';
import { AppError } from './errorHandler';

export const notFoundHandler = (req: Request, res: Response): void => {
  throw new AppError(
    404,
    'NOT_FOUND',
    `Route ${req.method} ${req.originalUrl} not found`
  );
};
