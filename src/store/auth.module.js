const auth = {
  namespaced: true,
  state: {
    user: null,
    accessToken: '',
    refreshToken: '',
  },
  getters: {
    user(state) {
      return state.user
    },
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    }
  },
  mutations: {
    initialize(state) {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        state.user = user;
      }
      if (accessToken) {
        state.accessToken = accessToken;
      }
      if (refreshToken) {
        state.refreshToken = refreshToken;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    },
    setAccessToken(state, access) {
      state.accessToken = access;
    },
    removeAccessToken(state) {
      state.accessToken = '';
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    removeRefreshToken(state) {
      state.refreshToken = '';
    },
  },
  actions: {},
};

export default auth
