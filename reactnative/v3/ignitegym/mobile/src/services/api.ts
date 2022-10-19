import { storageAuthTokenGet, storageAuthTokenSave } from '@storage/storageAuthToken';
import { AppError } from '@utils/AppError';
import axios, { AxiosError, AxiosInstance } from 'axios';

type SignOut = () => void;

type FailedRequestQueueProps = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
}

let failedRequestQueue: FailedRequestQueueProps[] = [];
let isRefreshingToken = false;

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

        const originalRequestConfig = error.config;

        if (isRefreshingToken) {
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token) => {
                originalRequestConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              }
            })
          })
        }

        isRefreshingToken = true;

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { token: expiredToken });
            
            await storageAuthTokenSave(data.token);

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
          } catch (error) {
            
          } finally {
            isRefreshingToken = false;
          }
        })
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