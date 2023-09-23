import Vue from 'vue';
import VueRouter from 'vue-router';

import routeModules from './modules';

Vue.use(VueRouter);

/**
 * @type {import('vue-router').RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    redirect: '/apple',
  },
  ...routeModules,
];

export const router = new VueRouter({
  mode: 'hash',
  routes,
});

/**
 * 设置权限守卫
 * @param {import('vue-router/types/router').VueRouter} router
 */
export function setupPermissionGuard(router: VueRouter) {
  router.beforeEach((to, from, next) => {
    // eslint-disable-next-line no-console
    console.log('beforeEach', to, from);
    next();
  });

  router.afterEach((to, from) => {
    // eslint-disable-next-line no-console
    console.log('afterEach', to, from);
  });
}
