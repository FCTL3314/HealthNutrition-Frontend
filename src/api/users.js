export default function (instance) {
  return {
    obtainToken(payload) {
      return instance.post('token/', payload);
    },
    refreshToken(payload) {
      return instance.post('token/refresh/', payload);
    },
    register(payload) {
      return instance.post('users/', payload);
    },
    me() {
      return instance.get('users/me/');
    }
  };
}