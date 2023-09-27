import {createRouter, createWebHistory} from 'vue-router';
import {createTitle, scrollToTop} from '@/utils';
import store from '@/store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (!(to.query.save_position === "true")) {
      scrollToTop('instant')
    }
  },
  routes: [
    {
      name: 'categories',
      path: '/',
      component: () => import('@/views/CategoriesView.vue'),
      meta: {
        title: 'Categories',
      },
    },
    {
      name: 'products',
      path: '/products/:categorySlug/',
      component: () => import('@/views/ProductsView.vue'),
      meta: {
        title: 'Products',
      },
    },
    {
      name: 'product',
      path: '/products/:categorySlug/product/:productSlug/',
      component: () => import('@/views/ProductView.vue'),
      meta: {
        title: 'Product',
      },
    },
    {
      name: 'users',
      path: '/users/',
      children: [
        {
          name: 'auth',
          path: 'auth/',
          component: () => import('@/views/layouts/AuthLayout.vue'),
          children: [
            {
              name: 'logIn',
              path: 'login/',
              component: () => import('@/views/LogInView.vue'),
              meta: {
                title: 'Log In',
              },
            },
            {
              name: 'registration',
              path: 'registration/',
              component: () => import('@/views/SignUpView.vue'),
              meta: {
                title: 'Sign Up',
              },
            },
          ],
        },
        {
          name: 'settings',
          path: 'settings/',
          component: () => import('@/views/layouts/SettingsLayout.vue'),
          children: [
            {
              name: 'accountSettingsTab',
              path: 'account/',
              component: () => import('@/components/settings/AccountTab.vue'),
              meta: {
                title: "Account Settings"
              }
            }
          ],
        },
        {
          name: 'profile',
          path: 'profile/:userSlug/',
          component: () => import('@/views/ProfileView.vue'),
          meta: {
            title: 'Profile',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: 'Not Found'
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = createTitle(to.meta.title);
  const loggedIn = !!store.getters['auth/accessToken'];
  if (to.name === 'settings' && !loggedIn) {
    next({name: 'logIn'})
  } else {
    next();
  }
});

export default router;
