import axios, { AxiosError } from 'axios';

const HAHOW_HOST = 'https://hahow-recruit.herokuapp.com/';
const request = axios.create({
  baseURL: HAHOW_HOST,
});

export async function auth(name: string, password: string): Promise<boolean> {
  try {
    await request.post(
      '/auth',
      { name, password },
      {
        validateStatus: (status: number) => {
          return status === 200; // Resolve only if the status code is 200
        },
      }
    );
    return true;
  } catch (e) {
    if (e.isAxiosError) {
      const axiosError = e as AxiosError;
      if (axiosError.response?.status === 401) {
        return false;
      }
    }
    throw e;
  }
}
