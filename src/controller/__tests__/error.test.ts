import errorHandler from '../error';
import {
  HahowHeroDataError,
  HahowHeroNotFoundError,
} from '../../services/hahowHero';
import { Response } from 'express';

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
  });

  test('should call response 404 when HahowHeroNotFoundError', () => {
    const error = new HahowHeroNotFoundError('1');
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ message: 'hero(id = 1) not found' });
  });

  test('should call response 500  when HahowHeroDataError', () => {
    const error = new HahowHeroDataError({});
    errorHandler(error, req, res, next);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: 'internal server error' });
  });
});
