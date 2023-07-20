import {createRouter, createWebHistory} from 'vue-router';
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
    {
      name: 'users',
      path: '/users/',
      component: () => import("@/views/layouts/AuthLayout.vue"),
      children: [
        {
          name: 'login',
          path: 'login/',
          component: () => import("@/views/LogIn.vue"),
          meta: {
            title: 'LogIn',
          },
        },
        {
          name: 'registration',
          path: 'registration/',
          component: () => import("@/views/Registration.vue"),
          meta: {
            title: 'SignUp',
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = createTitle(to.meta.title);
  next();
});

export default router;
