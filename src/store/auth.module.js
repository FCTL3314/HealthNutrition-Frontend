import {authStorage} from "@/services/auth";
import {tryParseOrDefault} from "@/utils";

const auth = {
    namespaced: true,
    state: {
        user: tryParseOrDefault(authStorage().getItem("user"), null),
        accessToken: authStorage().getItem("accessToken") || "",
        refreshToken: authStorage().getItem("refreshToken") || "",
    },
    getters: {
        user(state) {
            return state.user;
        },
        accessToken(state) {
            return state.accessToken;
        },
        refreshToken(state) {
            return state.refreshToken;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        removeUser(state) {
            state.user = null;
        },
        setAccessToken(state, access) {
            state.accessToken = access;
        },
        removeAccessToken(state) {
            state.accessToken = "";
        },
        setRefreshToken(state, refreshToken) {
            state.refreshToken = refreshToken;
        },
        removeRefreshToken(state) {
            state.refreshToken = "";
        },
    },
    actions: {},
};

export default auth;
