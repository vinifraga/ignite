import { storageAuthTokenGet } from '@storage/storageAuthToken';
import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from 'axios';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

const api = axios.create({
  baseURL: 'http://192.168.15.6:3333'
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async error => {
    if (error.response?.status === 401) {
      if (error.response.data?.message === 'token.expired') {
        const expiredToken = await storageAuthTokenGet();

        if (!expiredToken) {
          signOut();
          return Promise.reject(error);
        }
      } else {
        signOut();
      }
    }
    
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }
      
    return Promise.reject(error);
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
} 

export { api };