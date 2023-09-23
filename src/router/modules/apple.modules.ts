import BaseLayout from '@/layouts/base-layout.vue';

/**
 * @type {import('vue-router').RouteConfig[]}
 */
export default [
  {
    path: '/apple',
    component: BaseLayout,
    redirect: '/apple/route',
    children: [
      {
        path: 'route',
        component: () => import('@/views/demo/apple.vue'),
      },
    ],
  },
];
