export default function (instance) {
  return {
    logIn(payload) {
      return instance.post('token/', payload);
    },
    me() {
      return instance.get('users/me/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
    }
  };
};