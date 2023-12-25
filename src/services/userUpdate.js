import {getImageFullPath} from "@/utils";
import store from "@/store";


export async function updateLocalUser(updatedUser, updatedUserProfile = null) {
    store.commit("auth/updateUser", updatedUser);

    const updatedUserProfileCopy = {...updatedUserProfile};
    if (updatedUserProfileCopy.image) {
        updatedUserProfileCopy.image = getImageFullPath(updatedUserProfileCopy.image);
    }

    store.commit("auth/updateProfile", updatedUserProfileCopy);
}
