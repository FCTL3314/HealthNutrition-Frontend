import {getImageFullPath} from "@/utils";
import {authStorage} from "@/services/auth";
import toaster from "@/plugins/toaster";
import store from "@/store";


export async function afterUpdateActions(updatedUser, message) {
  let updatedUserCopy = {...updatedUser, image: getImageFullPath(updatedUser['image'])}
  store.commit('auth/setUser', updatedUserCopy);
  authStorage().setItem('user', JSON.stringify(updatedUserCopy));
  toaster.success(message)
}
