jest.mock('axios', () => ({
  create: jest.fn().mockReturnThis(),
  post: jest.fn(),
}));

import { auth } from '../hahowAuth';
import axios from 'axios';

describe('hahowAuth', () => {
  test('should return true if api request success', async () => {
    const mockPost = axios.post as jest.Mock;
    mockPost.mockImplementation(() => ({
      data: 'ok',
      status: 200,
    }));
    expect(await auth('hahow', 'rock')).toBe(true);
    expect(mockPost).toBeCalledWith(
      '/auth',
      { name: 'hahow', password: 'rock' },
      {
        validateStatus: expect.any(Function),
      }
    );
  });

  test('should return false if api response 401', async () => {
    const mockPost = axios.post as jest.Mock;
    mockPost.mockImplementation(() => {
      throw {
        isAxiosError: true,
        response: { status: 401 },
      };
    });
    expect(await auth('hahow', 'rockkkkkkk')).toBe(false);
    expect(mockPost).toBeCalledWith(
      '/auth',
      {
        name: 'hahow',
        password: 'rockkkkkkk',
      },
      { validateStatus: expect.any(Function) }
    );
  });

  test('should throw error when unknown error occur', async () => {
    const mockPost = axios.post as jest.Mock;
    mockPost.mockImplementation(() => {
      throw new Error();
    });
    expect.assertions(2);
    try {
      await auth('hahow', 'abcde');
    } catch (e) {
      expect(e).toEqual(new Error());
    }
    expect(mockPost).toBeCalledWith(
      '/auth',
      {
        name: 'hahow',
        password: 'abcde',
      },
      {
        validateStatus: expect.any(Function),
      }
    );
  });
});
