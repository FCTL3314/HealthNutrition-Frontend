const auth = {
  namespaced: true,
  state: {
    accessToken: '',
    refreshToken: '',
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    refreshToken(state) {
      return state.refreshToken;
    }
  },
  mutations: {
    initializeStore(state) {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if (accessToken) {
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      } else {
        state.accessToken = '';
      }
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
