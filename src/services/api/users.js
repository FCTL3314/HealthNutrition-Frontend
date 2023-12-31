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
        me(authenticationToken = null) {
            const headers = {};
            if (authenticationToken) {
                headers.Authorization = `Bearer ${authenticationToken}`;
            }
            return instance.get("users/me/", {headers});
        },
        specificUser(userSlug) {
            return instance.get(`users/${userSlug}/`);
        },
        update(payload) {
            return instance.patch("users/me/", payload);
        },
        updateProfile(payload) {
            return instance.patch("user-profiles/profile/update/", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        },
        changeEmail(payload) {
            return instance.post("users/change-email/", payload);
        },
        resetPassword(payload) {
            return instance.post("users/reset_password/", payload);
        },
        resetPasswordConfirm(payload) {
            return instance.post("users/reset_password_confirm/", payload);
        },
        setPassword(payload) {
            return instance.post("users/set_password/", payload);
        },
        sendEmailVerification(payload) {
            return instance.post("users/verification/send/", payload);
        },
        verifyUser(payload) {
            return instance.post("users/verification/verify/", payload);
        },
    };
}