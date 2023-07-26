import store from '@/store/index'


export default function () {
  const accessToken = store.getters['auth/accessToken'];

  return accessToken
    ? {Authorization: `Bearer ${accessToken}`}
    : {Authorization: ''};
}