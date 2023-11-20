import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import "typeface-quicksand";


import App from "@/App.vue";
import {createApp} from "vue";
import router from "@/router";
import setupInterceptors from "@/services/api/interceptors";
import store from "@/store";

const app = createApp(App);

app.use(router);
app.use(store);
setupInterceptors(store);

app.mount("#app");
