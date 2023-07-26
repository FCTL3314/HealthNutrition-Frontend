import {getAuthHeaders} from '@/services/auth'


export default function (instance) {
  return {
    obtainToken(payload) {
      return instance.post('token/', payload);
    },
    refreshToken(payload) {
      return instance.post('token/refresh/', payload);
    },
    me() {
      return instance.get('users/me/', {
        headers: getAuthHeaders(),
      });
    }
  };
}