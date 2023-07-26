import instance from '@/api/instance';
import api from '@/api/index';


const setup = (store) => {
  instance.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/users/registration' && error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        error.config._retry = true;

        try {
          const res = await api.users.refreshToken({
            refresh: localStorage.getItem('refreshToken')
          });
          const accessToken = res.data.access;

          store.commit('auth/setAccessToken', accessToken);
          localStorage.setItem('accessToken', accessToken);

          return instance(originalConfig);
        } catch (_error) {
          if (_error.response.status === 401) {
            store.commit('auth/removeAccessToken');
            store.commit('auth/removeRefreshToken');
            store.commit('auth/removeUser');
          }
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  });
};


export default setup;
