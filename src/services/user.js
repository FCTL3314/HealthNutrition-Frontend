import {getImageFullPath, isJWTTokenExpired} from "@/utils";
import store from "@/store";
import {authStorage} from "@/services/auth";
import api from "@/services/api";


export async function updateAccessToken() {
    const refreshToken = authStorage().getItem("refreshToken");

    if (refreshToken && !isJWTTokenExpired(refreshToken)) {
        const response = await api.users.refreshToken({refresh: refreshToken});
        const accessToken = response.data.access;

        store.commit("auth/setAccessToken", accessToken);
        authStorage().setItem("accessToken", accessToken);
        return true;
    }
    return false;
}

export async function getUser(retry = false) {
    const accessToken = authStorage().getItem("accessToken");
    if (!accessToken) {
        return null;
    }
    try {
        return (await api.users.me(accessToken)).data;
    } catch (error) {
        if (error.response.status === 401 && !retry) {
            const isAccessTokenUpdated = await updateAccessToken();
            if (!isAccessTokenUpdated) {
                return null;
            }
            return await getUser(true);
        }
    }
}

export async function updateLocalUser(updatedUser, updatedUserProfile = null) {
    store.commit("auth/updateUser", updatedUser);

    const updatedUserProfileCopy = {...updatedUserProfile};
    if (updatedUserProfileCopy.image) {
        updatedUserProfileCopy.image = getImageFullPath(updatedUserProfileCopy.image);
    }

    store.commit("auth/updateProfile", updatedUserProfileCopy);
}
