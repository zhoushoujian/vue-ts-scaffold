import Vue from 'vue';
import { router, setupPermissionGuard } from '@/router';
import App from './app.vue';

setupPermissionGuard(router);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
