import vue from '@vitejs/plugin-vue2';
// import legacy from '@vitejs/plugin-legacy';
import { defineConfig } from 'vite';
import { join } from 'path';

// https://vitejs.dev/config/
export default () => {
  const root = process.cwd();
  return defineConfig({
    root,
    base: '/',
    plugins: [
      vue(),
      //无法支持IE，先注释
      // legacy({
      //   targets: ['defaults', 'IE 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // }),
    ],
    resolve: {
      alias: {
        '@': join(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 8000,
      proxy: {
        '/api': {
          target: 'http://10.30.4.94:8077',
          changeOrigin: true,
          rewrite: (path) => {
            // eslint-disable-next-line no-console
            console.log('proxy received, path: ', path);
            return `http://10.30.4.94:8077${path}`;
          },
        },
      },
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  });
};
