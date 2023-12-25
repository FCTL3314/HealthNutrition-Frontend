import api from "@/services/api";
import {authStorage} from "@/services/auth";


const auth = {
    namespaced: true,
    state: {
        user: authStorage().getItem("accessToken")
            ? (await api.users.me(authStorage().getItem("accessToken"))).data
            : null,
        accessToken: authStorage().getItem("accessToken") || "",
        refreshToken: authStorage().getItem("refreshToken") || "",
    },
    getters: {
        user(state) {
            return state.user;
        },
        userProfile(state) {
            return state.user.profile;
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
        updateUser(state, updatedUser) {
            state.user = {...state.user, ...updatedUser}  ;
        },
        updateProfile(state, updatedProfile) {
            state.user.profile = {...state.user.profile, ...updatedProfile}  ;
        },
        setEmail(state, newEmail) {
            state.user.email = newEmail;
        },
        verifyUser(state) {
            state.user.isVerified = true;
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
