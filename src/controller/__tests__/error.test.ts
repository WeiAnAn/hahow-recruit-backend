jest.mock('../../logger');

import errorHandler from '../error';
import {
  HahowHeroDataError,
  HahowHeroNotFoundError,
} from '../../services/hahowHero';
import {
  AuthValidationError,
  AuthenticationError,
} from '../../middlewares/auth';
import { Response } from 'express';
import logger from '../../logger';

describe('errorHandler', () => {
  const next = jest.fn();
  const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const res = (mockRes as unknown) as Response;
  let req;
  beforeEach(() => {
    req = {};
  });

  test('should call response internal server error when error is unknown', () => {
    const error = new Error();
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: 'internal server error' });
    expect(logger.error).toBeCalledWith(error);
  });

  test('should call response 404 when HahowHeroNotFoundError', () => {
    const error = new HahowHeroNotFoundError('1');
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: 'hero(id = 1) not found' });
    expect(logger.error).toBeCalledWith(error);
  });

  test('should call response 500  when HahowHeroDataError', () => {
    const error = new HahowHeroDataError({});
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: 'internal server error' });
    expect(logger.error).toBeCalledWith(error);
  });

  test('should call response 400 when AuthValidationError', () => {
    const error = new AuthValidationError('hahow');
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({ message: 'auth validation error' });
    expect(logger.error).toBeCalledWith(error);
  });

  test('should call response 401 when AuthenticationError', () => {
    const error = new AuthenticationError('hahow', 'rocksss');
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ message: 'authentication error' });
    expect(logger.error).toBeCalledWith(error);
  });
});
