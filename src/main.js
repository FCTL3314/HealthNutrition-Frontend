import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

import {createApp} from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import setupInterceptors from '@/api/interceptors';

const app = createApp(App);

app.use(router);
app.use(store);
setupInterceptors(store)

app.mount('#app');
