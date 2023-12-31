import {getLocalStorageBoolean} from "@/services/parsers";


const nutrition = {
    namespaced: true,
    state: {
        isMoreCaloriesBetter: getLocalStorageBoolean(
            localStorage.getItem("isMoreCaloriesBetter"), true
        ),
        isMoreProteinBetter: getLocalStorageBoolean(
            localStorage.getItem("isMoreProteinBetter"), true
        ),
        isMoreFatBetter: getLocalStorageBoolean(
            localStorage.getItem("isMoreFatBetter"), true
        ),
        isMoreCarbsBetter: getLocalStorageBoolean(
            localStorage.getItem("isMoreCarbsBetter"), false
        ),
    },
    getters: {
        isMoreCaloriesBetter(state) {
            return state.isMoreCaloriesBetter;
        },
        isMoreProteinBetter(state) {
            return state.isMoreProteinBetter;
        },
        isMoreFatBetter(state) {
            return state.isMoreFatBetter;
        },
        isMoreCarbsBetter(state) {
            return state.isMoreCarbsBetter;
        },
    },
    mutations: {
        setIsMoreCaloriesBetter(state, value) {
            state.isMoreCaloriesBetter = JSON.parse(value);
        },
        setIsMoreProteinBetter(state, value) {
            state.isMoreProteinBetter = JSON.parse(value);
        },
        setIsMoreFatBetter(state, value) {
            state.isMoreFatBetter = JSON.parse(value);
        },
        setIsMoreCarbsBetter(state, value) {
            state.isMoreCarbsBetter = JSON.parse(value);
        },
    },
    actions: {},
};

export default nutrition;