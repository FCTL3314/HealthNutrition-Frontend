import {authStorage, logout} from "@/services/auth";
import instance from "@/services/api/instance";
import {updateAccessToken} from "@/services/user";


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

                const isAccessTokenUpdated = await updateAccessToken();

                if (isAccessTokenUpdated) {
                    return instance(originalConfig);
                } else {
                    await logout();
                }
            }
        }
        return Promise.reject(error);
    });
};


export default setup;
