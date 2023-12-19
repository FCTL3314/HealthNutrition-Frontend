import {getImageFullPath} from "@/utils";
import store from "@/store";


export async function updateLocalUser(updatedUser) {
    const updatedUserCopy = {...updatedUser};
    if (updatedUser.image) {
        updatedUserCopy.image = getImageFullPath(updatedUser.image);
    }
    store.commit("auth/setUser", updatedUserCopy);
}
