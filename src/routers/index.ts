import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Error403Page, Error404Page } from '@szhou/components';
// import { guardForRoutePage } from '@szhou/script-tools';
// import type { IMenuList } from '@szhou/script-tools';
import { routerPrefix } from '@/constants/enums';

NProgress.configure({ showSpinner: false });

// const moduleName = routerPrefix.slice(1);
// const treeData: IMenuList[] = JSON.parse(localStorage.getItem('moduleMenus') || '{}')[moduleName];
const router = createRouter({
  history: createWebHistory(routerPrefix),
  //todo
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/forget-password',
      name: 'forgetPassword',
      component: () => import('../views/forget-password/index.vue'),
      // beforeEnter: () => guardForRoutePage(treeData, moduleName),  //todo-路由守卫样板代码
    },
    {
      path: '/',
      name: 'pageContainer',
      component: () => import('../layouts/page-container.vue'),
      //todo
      children: [
        {
          path: '/',
          name: 'index',
          component: () => import('../views/redirect/index.vue'),
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('../components/table-component/test.vue'),
        },
        {
          path: '/form',
          name: 'form',
          component: () => import('../components/form-component/test.vue'),
        },
        {
          path: '/custom-card',
          name: 'customCard',
          component: () => import('../components/custom-card/test.vue'),
        },
        {
          path: '/others',
          name: 'others',
          children: [
            {
              path: '/others/table-upload',
              name: 'tableUpload',
              //二级级页面（比如详情页或编辑页）一定要设置activeRoutePath，否则菜单不能自动高亮和自动展开
              // meta: { activeRoutePath: '/others' },
              component: () => import('../components/table-upload/index.vue'),
            },
          ],
        },
        {
          path: '/redirect',
          name: 'redirect',
          component: () => import('../views/redirect/index.vue'),
        },
        {
          path: '/403',
          name: '403',
          component: Error403Page,
        },
        {
          path: '/404',
          name: '404',
          component: Error404Page,
        },
        {
          path: '/:pathMatch(.*)*',
          name: 'notFound',
          component: Error404Page,
        },
      ],
    },
  ],
});

router.beforeEach((_to, _from, next) => {
  NProgress.start();
  next();
});

router.afterEach((_to, _from) => {
  NProgress.done();
});

export default router;
