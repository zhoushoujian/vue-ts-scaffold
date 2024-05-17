import webpack from 'webpack';
import * as path from 'path';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import type { Configuration } from 'webpack-dev-server/types/lib/Server.d';
import commonConf from './common';

const dev: webpack.Configuration = merge(commonConf, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    //@ts-ignore
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json'),
        extensions: {
          vue: {
            enabled: true,
            compiler: '@vue/compiler-sfc',
          },
        },
      },
    }),
  ],
  devServer: {
    //todo
    port: 8443,
    historyApiFallback: true,
    //启用热更新
    liveReload: true,
    // hot: true,
    client: {
      overlay: false,
      logging: 'none',
    },
    //todo
    open: `/scaffold/redirect`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      //todo
      '/api': {
        target: 'http://119.3.170.85:30102',
        changeOrigin: true,
        pathRewrite: (path) => {
          path = path.replace(/^\/api/, '');
          // eslint-disable-next-line no-console
          console.log('/api/ path', path);
          return path;
        },
      },
      //todo
      '/files': {
        target: 'https://file.zhoushoujian.com',
        changeOrigin: true,
        pathRewrite: (path) => {
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
        pathRewrite: (path) => {
          // eslint-disable-next-line no-console
          console.log('/portal path', path);
          return path;
        },
      },
    },
  } as Configuration,
});

export default dev;
