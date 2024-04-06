import { createApp, App } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/src/index.scss';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-overlay.css';
import 'element-plus/theme-chalk/el-reset.css';
import '@szhou/components/dist/vue/esm/style.css';
import { renderWithQiankun, qiankunWindow, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import router from '@/routers';
import AppComponent from './app.vue';

let app: App<Element> | null;

function render(container: HTMLElement | null, name: string) {
  app = createApp(AppComponent);

  app.use(createPinia());
  app.use(router);
  app.use(ElementPlus);

  app.config.errorHandler = (err, vm, info) => {
    // eslint-disable-next-line no-console
    console.error('全局异常', err, vm, info);
  };

  let el = document.querySelector('#app');
  if (container) {
    el = container.querySelector('#app');
    //修正微前端子应用样式，如果是微前端子应用，下面四行代码勿删
    name = name.split('-').join('_');
    const rootElement = document.getElementById(`__qiankun_microapp_wrapper_for_${name}__`)!;
    rootElement.style.width = '100%';
    rootElement.style.height = '100%';
  }
  app.mount(el!);
}

//todo
//如果你的应用不是微前端应用，可将qiankun的3个生命周周期代码移除
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  //vite需要的qiankun生命周期
  renderWithQiankun({
    bootstrap() {
      // console.log('微应用：bootstrap');
    },
    mount(props: QiankunProps) {
      const { container, name } = props;
      render(container!, name);
    },
    unmount(_props: QiankunProps) {
      app!.unmount();
      app = null;
    },
    update(_props) {
      // console.log('微应用：update', props);
    },
  });
  //@ts-ignore
} else if (!window.__POWERED_BY_QIANKUN__) {
  render(null, '');
}

// 开发环境开启热更新
if (process.env.NODE_ENV === 'development' && typeof module !== 'undefined') {
  if ((module as any).hot) {
    (module as any).hot.accept();
  }
}

//todo - webpack需要的qiankun生命周期
export async function bootstrap() {
  // console.log('[scaffold] app bootstrap');
}

export async function mount(props: QiankunProps) {
  const { container, name } = props;
  render(container!, name);
}

export async function unmount() {
  app!.unmount();
  app = null;
}
