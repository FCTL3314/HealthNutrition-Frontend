import authModule from "@/store/auth.module";
import nutritionModule from "@/store/nutrition.module";
import {createStore} from "vuex";


const store = createStore({
    modules: {
        auth: authModule,
        nutrition: nutritionModule,
    },
});

export default store;
