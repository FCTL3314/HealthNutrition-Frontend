export default function (instance) {
    return {
        obtainToken(payload) {
            return instance.post("token/", payload);
        },
        refreshToken(payload) {
            return instance.post("token/refresh/", payload);
        },
        register(payload) {
            return instance.post("users/", payload);
        },
        me() {
            return instance.get("users/me/");
        },
        update(payload) {
            return instance.patch("users/me/", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        },
        changeEmail(payload) {
            return instance.post("users/change-email/", payload);
        },
        specificUser(userSlug) {
            return instance.get(`users/${userSlug}/`);
        },
    };
}