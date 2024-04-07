import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';
// import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';
import vueJsx from '@vitejs/plugin-vue-jsx';

const analyzer = process.env.type === 'analyzer';

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  publicDir: path.resolve(__dirname, './public'),
  base: '/',
  plugins: [
    vue(),
    // legacy({
    //   targets: ['Chrome 63'],
    //   polyfills: true,
    //   modernPolyfills: true,
    // }),
    analyzer ? visualizer({ open: true }) : null,
    vueJsx(),
  ].filter(Boolean),
  clearScreen: false,
  server: {
    port: 8000,
    strictPort: true,
    //todo
    open: `/portal/404`,
    hmr: true,
    cors: true,
    proxy: {
      //todo
      '/api': {
        target: 'http://119.3.170.85:30080',
        changeOrigin: true,
        rewrite: (path) => {
          // eslint-disable-next-line no-console
          console.log('/api path', path);
          return path;
        },
      },
      //todo
      '/payment': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path: string) => {
          // eslint-disable-next-line no-console
          console.log('/payment proxy received, path: ', path);
          return `http://localhost:8001${path}`;
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
        additionalData: '@import "./src/styles/variables.scss";',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
