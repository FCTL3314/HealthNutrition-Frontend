import { createRouter, createWebHistory } from 'vue-router';
import constants from '@/constants';
import Categories from "@/views/Categories.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'categories',
      path: '/',
      component: Categories,
      meta: {
        title: 'Categories',
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | ${constants.titleEnding}`;
  next();
});

export default router;
