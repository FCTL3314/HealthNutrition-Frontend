import {createRouter, createWebHistory} from 'vue-router';
import {createTitle, scrollToTop} from '@/utils';
import store from '@/store/index'
import {isAuthenticatedOnlyRedirectRequired, isGuestsOnlyRedirectRequired} from "@/router/utils";

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
          meta: {
            guestsOnly: true,
          },
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
              name: 'signUp',
              path: 'sign-up/',
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
          meta: {
            authenticatedOnly: true,
          },
          children: [
            {
              name: 'accountSettingsTab',
              path: 'account/',
              component: () => import('@/components/settings/AccountTab.vue'),
              meta: {
                title: "Account Settings",
              }
            },
            {
              name: 'emailSettingsTab',
              path: 'email/',
              component: () => import('@/components/settings/EmailTab.vue'),
              meta: {
                title: "Email Settings",
              },
            },
            {
              name: 'passwordSettingsTab',
              path: 'password/',
              component: () => import('@/components/settings/EmailTab.vue'),
              meta: {
                title: "Password Settings",
              }
            },
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
  const user = store.getters['auth/user'];
  const title = to.meta.title;
  if (title) {
    document.title = createTitle(title);
  }
  if (isAuthenticatedOnlyRedirectRequired(to, user)) {
    console.log("Redirecting to the log in page...");
    next({name: 'logIn'});
    return;
  }
  if (isGuestsOnlyRedirectRequired(to, user)) {
    console.log("Redirecting to the user's profile page...");
    next({name: 'profile', params: {userSlug: user.slug}});
    return;
  }
  next();
});

export default router;
