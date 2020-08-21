import { Request, Response, NextFunction } from 'express';
import {
  HahowHeroDataError,
  HahowHeroNotFoundError,
} from '../services/hahowHero';
import { AuthValidationError, AuthenticationError } from '../middlewares/auth';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction //eslint-disable-line @typescript-eslint/no-unused-vars
): Response | void {
  if (err instanceof HahowHeroDataError) {
    return res.status(500).json({ message: 'internal server error' });
  }
  if (err instanceof HahowHeroNotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof AuthValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof AuthenticationError) {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ message: 'internal server error' });
}
