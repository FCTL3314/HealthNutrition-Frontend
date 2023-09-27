import store from '@/store/index';
import router from '@/router';
import toaster from "@/plugins/toaster";

export function removeUserFromStore() {
  store.commit('auth/removeAccessToken');
  store.commit('auth/removeRefreshToken')
  store.commit('auth/removeUser')
}

export function removeUserFromLocalStorage() {
  authStorage().removeItem('accessToken');
  authStorage().removeItem('refreshToken');
  authStorage().removeItem('user');
}

export async function logout() {
  removeUserFromStore();
  removeUserFromLocalStorage();
  await router.push({name: 'logIn'});
}

export async function logoutWithFlush() {
  await logout()
  toaster.success('You have successfully logged out.')
}

export function authStorage() {
  return JSON.parse(localStorage.getItem('rememberMe')) ? localStorage : sessionStorage;
}
