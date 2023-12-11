export default function (instance) {
    return {
        checkUIDAndToken(payload) {
            return instance.post("auth/uid-token-check/", payload);
        },
    };
}