import {authStorage} from "@/services/auth";
import {getImageFullPath} from "@/utils";
import store from "@/store";
import toaster from "@/plugins/toaster";


export async function afterUpdateActions(updatedUser, message) {
    let updatedUserCopy = {...updatedUser, image: getImageFullPath(updatedUser["image"])};
    store.commit("auth/setUser", updatedUserCopy);
    authStorage().setItem("user", JSON.stringify(updatedUserCopy));
    toaster.success(message);
}
