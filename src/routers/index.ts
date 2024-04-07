import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
NProgress.configure({ showSpinner: false });

const router = new Router({
  mode: 'history',
  base: `/portal`, //todo
  scrollBehavior: () => ({ y: 0, x: 0 }),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/',
      name: 'pageContainer',
      component: () => import('../layouts/header-menu.vue'),
      children: [
        {
          path: '/redirect',
          name: 'redirect',
          component: () => import('../views/redirect.vue'),
        },
        {
          path: '/403',
          name: '403',
          component: () => import('../views/error/403.vue'),
        },
        {
          path: '/404',
          name: '404',
          component: () => import('../views/error/404.vue'),
        },
        {
          path: '/:w+',
          name: 'micro',
          component: () => import('../views/micro-app.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((_to, _from, next) => {
  // eslint-disable-next-line no-console
  // console.log('beforeEach', to, from);
  NProgress.start();
  next();
});

router.afterEach((_to, _from) => {
  // eslint-disable-next-line no-console
  // console.log('afterEach', to, from);
  NProgress.done();
});

export default router;
