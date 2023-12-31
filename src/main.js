import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "typeface-quicksand";
import "animate.css";


import App from "@/App.vue";
import {createApp} from "vue";
import router from "@/router";
import setupInterceptors from "@/services/api/interceptors";
import store from "@/store";
import {getUser} from "@/services/user";

const app = createApp(App);

app.use(store);
store.commit("auth/setUser", await getUser());

app.use(router);
setupInterceptors();

app.mount("#app");
