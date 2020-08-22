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
    return next(
      new AuthValidationError(req.headers.name, req.headers.password)
    );
  }
  const name = req.headers.name as string;
  const password = req.headers.password as string;
  if (!(await auth(name, password))) {
    return next(new AuthenticationError(name, password));
  }
  res.locals.authenticated = true;
  return next();
}

export class AuthenticationError extends Error {
  data: { user: string; password: string };
  constructor(user: string, password: string) {
    super();
    this.name = 'AuthenticationError';
    this.message = 'authentication error';
    this.data = {
      user,
      password,
    };
  }
}

export class AuthValidationError extends Error {
  data: {
    user: string | string[] | undefined;
    password: string | string[] | undefined;
  };
  constructor(
    user: string | string[] | undefined,
    password?: string | string[] | undefined
  ) {
    super();
    this.name = 'AuthValidationError';
    this.message = 'auth validation error';
    this.data = { user, password };
  }
}
