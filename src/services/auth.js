import store from '@/store/index';
import router from "@/router";

export async function logout() {
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  authStorage().removeItem('accessToken');
  authStorage().removeItem('refreshToken');
  await router.push({name: 'login'});
}

export function authStorage() {
  return JSON.parse(localStorage.getItem('rememberMe')) ? localStorage : sessionStorage;
}
