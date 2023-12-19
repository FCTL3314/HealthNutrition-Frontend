import api from "@/services/api/index";
import {authStorage, logout} from "@/services/auth";
import instance from "@/services/api/instance";
import store from "@/store";
import {isJWTTokenExpired} from "@/utils";


const setup = () => {
    instance.interceptors.request.use(
        (config) => {
            const token = authStorage().getItem("accessToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    instance.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const originalConfig = error.config;

        if (originalConfig.url !== "/users/login" && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                error.config._retry = true;

                const refreshToken = authStorage().getItem("refreshToken");

                if (refreshToken && !isJWTTokenExpired(refreshToken)) {
                    try {
                        const _response = await api.users.refreshToken({refresh: refreshToken});
                        const accessToken = _response.data.access;

                        store.commit("auth/setAccessToken", accessToken);
                        authStorage().setItem("accessToken", accessToken);

                        return instance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                } else {
                    await logout();
                }
            }
        }
        return Promise.reject(error);
    });
};


export default setup;
