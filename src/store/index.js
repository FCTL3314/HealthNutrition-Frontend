import {createStore} from 'vuex';


const store = createStore({
  state() {
    return {
      user: null,
      token: null,
    };
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    isLoggedIn: (state) => !!state.token
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    user(context, user) {
      context.commit('setUser', user);
    },
    token(context, token) {
      context.commit('setToken', token);
    },
  },
});

export default store
