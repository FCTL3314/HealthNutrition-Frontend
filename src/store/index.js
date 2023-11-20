import authModule from "@/store/auth.module";
import {createStore} from "vuex";
import nutritionModule from "@/store/nutrition.module";


const store = createStore({
    modules: {
        auth: authModule,
        nutrition: nutritionModule,
    },
});

export default store;
