jest.mock('../../services/hahowAuth.ts');
import {
  authMiddleware,
  AuthenticationError,
  AuthValidationError,
} from '../auth';
import { auth } from '../../services/hahowAuth';
import { NextFunction, Request, Response } from 'express';

describe('middlewares/auth', () => {
  const req = { headers: {} },
    res = {
      locals: {},
    };
  const next: NextFunction = jest.fn();

  beforeEach(() => {
    req.headers = {};
    res.locals = {};
  });

  test('should skip auth if not giving name and password', async () => {
    await authMiddleware(
      (req as unknown) as Request,
      (res as unknown) as Response,
      next
    );
    expect(next).toBeCalled();
    expect((<Response>res).locals.authenticated).toBe(false);
  });

  test('should auth successful and set res.locals.authenticated = true', async () => {
    req.headers = { name: 'hahow', password: 'rocks' };
    const mockAuth = auth as jest.Mock;
    mockAuth.mockImplementation(() => true);
    await authMiddleware(
      (req as unknown) as Request,
      (res as unknown) as Response,
      next
    );
    expect(next).toBeCalled();
    expect(mockAuth).toBeCalledWith('hahow', 'rocks');
    expect((<Response>res).locals.authenticated).toBe(true);
  });

  test('should call next with AuthValidationError when request headers invalid', async () => {
    req.headers = { name: 'hahow' };
    await authMiddleware(
      (req as unknown) as Request,
      (res as unknown) as Response,
      next
    );
    expect(next).toBeCalledWith(new AuthValidationError('hahow'));
  });

  test('should call next with AuthenticationError when auth failed', async () => {
    req.headers = { name: 'hahow', password: 'rock' };
    const mockAuth = auth as jest.Mock;
    mockAuth.mockImplementation(() => false);
    await authMiddleware(
      (req as unknown) as Request,
      (res as unknown) as Response,
      next
    );
    expect(mockAuth).toBeCalledWith('hahow', 'rock');
    expect(next).toBeCalledWith(new AuthenticationError('hahow', 'rock'));
  });
});
