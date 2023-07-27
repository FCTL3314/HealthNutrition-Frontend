import store from '@/store/index';
import router from "@/router";

export async function logout() {
  const storage = getAuthStorage()
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  storage.removeItem('accessToken');
  storage.removeItem('refreshToken');
  await router.push({name: 'login'});
}

export function getAuthStorage() {
  return JSON.parse(localStorage.getItem('rememberMe')) ? localStorage : sessionStorage;
}
