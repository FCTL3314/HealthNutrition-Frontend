import store from '@/store/index';
import router from "@/router";

export async function logout() {
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  await router.push({name: 'login'});
}

export function getAuthHeaders() {
  const accessToken = store.getters['auth/accessToken'];

  return accessToken
    ? {Authorization: `Bearer ${accessToken}`}
    : {Authorization: ''};
}

export function getAuthStorage() {
  return JSON.parse(localStorage.getItem('rememberMe')) ? localStorage : sessionStorage;
}
