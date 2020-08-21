import { auth } from '../services/hahowAuth';
import { Request, Response, NextFunction } from 'express';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.headers.name && !req.headers.password) {
    res.locals.authenticated = false;
    return next();
  }
  if (!req.headers.name || !req.headers.password) {
    return next(new AuthValidationError());
  }
  const name = req.headers.name as string;
  const password = req.headers.password as string;
  if (!(await auth(name, password))) {
    return next(new AuthenticationError());
  }
  res.locals.authenticated = true;
  return next();
}

export class AuthenticationError extends Error {
  constructor() {
    super();
    this.name = 'AuthenticationError';
    this.message = 'authentication error ';
  }
}

export class AuthValidationError extends Error {
  constructor() {
    super();
    this.name = 'AuthValidationError';
    this.message = 'auth validation error';
  }
}
