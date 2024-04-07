import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';
import router from '@/routers';
import App from './app.vue';
import 'core-js/stable';
import 'whatwg-fetch';
import 'custom-event-polyfill';

Vue.use(Element, {
  locale,
});

const pinia = createPinia();
Vue.use(PiniaVuePlugin);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  //@ts-ignore
  router,
  pinia,
  render: (h) => h(App),
});
