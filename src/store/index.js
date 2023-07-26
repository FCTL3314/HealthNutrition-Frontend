import {createStore} from 'vuex';

import authModule from '@/store/auth.module'


const store = createStore({
  modules: {
    auth: authModule,
  }
});

export default store
