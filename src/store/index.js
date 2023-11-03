import authModule from "@/store/auth.module";
import {createStore} from "vuex";


const store = createStore({
    modules: {
        auth: authModule,
    }
});

export default store;
