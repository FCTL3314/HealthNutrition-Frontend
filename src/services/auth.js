import store from '@/store/index';
import router from '@/router';
import toaster from "@/plugins/toaster";

export async function logout() {
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  authStorage().removeItem('accessToken');
  authStorage().removeItem('refreshToken');
  await router.push({name: 'logIn'});
}

export async function logoutWithFlush() {
  await logout()
  toaster.success('You have successfully logged out.')
}

export function authStorage() {
  return JSON.parse(localStorage.getItem('rememberMe')) ? localStorage : sessionStorage;
}
