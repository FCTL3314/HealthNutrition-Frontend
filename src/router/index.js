import { createRouter, createWebHistory } from 'vue-router';
import createTitle from '@/utils/title';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'categories',
      path: '/',
      component: () => import("@/views/Categories.vue"),
      meta: {
        title: 'Categories',
      },
    },
    {
      name: 'products',
      path: '/products/:categorySlug/',
      component: () => import("@/views/Products.vue"),
      meta: {
        title: 'Products',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = createTitle(to.meta.title);
  next();
});

export default router;
