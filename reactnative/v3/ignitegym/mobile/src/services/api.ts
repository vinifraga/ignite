import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.6:3333'
});

api.interceptors.response.use(response => response, error => {
  if(error.response && error.response.data) {
    return Promise.reject(new AppError(error.response.data.message));
  }

  return Promise.reject(error);
});

export { api };