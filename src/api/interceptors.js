import instance from '@/api/instance';
import api from '@/api/index';
import {getAuthStorage} from "@/services/auth";
import {isTokenExpired} from '@/utils';
import {logout} from '@/services/auth';


const setup = (store) => {
  const storage = getAuthStorage()

  instance.interceptors.request.use(
    (config) => {
      const token = storage.getItem('accessToken');
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/users/login' && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        error.config._retry = true;

        const refreshToken = storage.getItem('refreshToken');

        if (!isTokenExpired(refreshToken)) {
          try {
            const res = await api.users.refreshToken({
              refresh: refreshToken,
            });
            const accessToken = res.data.access;

            store.commit('auth/setAccessToken', accessToken);
            storage.setItem('accessToken', accessToken);

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        } else {
          await logout()
        }
      }
    }
    return Promise.reject(error);
  });
};


export default setup;
