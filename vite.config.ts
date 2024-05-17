import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { consoleFormat } from '@szhou/script-tools';
import qiankun from 'vite-plugin-qiankun';
import checker from 'vite-plugin-checker';

consoleFormat();
const analyzer = process.env.type === 'analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  publicDir: path.resolve(__dirname, './public'),
  //todo
  base: '/scaffold/',
  plugins: [
    vue(),
    analyzer ? visualizer({ open: true }) : null,
    vueJsx(),
    checker({
      vueTsc: true,
      overlay: false,
    }),
    //todo
    qiankun('scaffold', {
      useDevMode: true,
    }),
  ].filter(Boolean),
  clearScreen: false,
  server: {
    //todo
    port: 8443,
    strictPort: true,
    open: `/scaffold/redirect`, //todo
    hmr: {
      overlay: false,
    },
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      //todo
      '/api': {
        target: 'http://119.3.170.85:30102',
        changeOrigin: true,
        rewrite: (path) => {
          path = path.replace(/^\/api/, '');
          // eslint-disable-next-line no-console
          console.log('/api path', path);
          return path;
        },
      },
      //todo
      '/files': {
        target: 'https://file.zhoushoujian.com',
        changeOrigin: true,
        rewrite: (path) => {
          // eslint-disable-next-line no-console
          console.log('/files path', path);
          return path;
        },
      },
      //todo
      '/portal': {
        // target: 'http://localhost:8000',
        target: 'http://119.3.170.85:30100',
        changeOrigin: true,
        rewrite: (path) => {
          // eslint-disable-next-line no-console
          console.log('/portal path', path);
          return path;
        },
      },
    },
  },
  envPrefix: ['VITE_'],
  build: {
    target: 'es2015',
    outDir: 'dist',
    chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        manualChunks: {
          components: ['@szhou/components'],
          element: ['element-plus'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      os: 'rollup-plugin-node-polyfills/polyfills/os',
      global: 'rollup-plugin-node-polyfills/polyfills/global',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
    },
    extensions: ['.ts', '.js', '.json', '.vue'],
  },
  // optimizeDeps: {
  //   force: true, // 强制进行依赖预构建
  // },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
