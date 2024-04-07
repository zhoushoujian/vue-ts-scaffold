import webpack from 'webpack';
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
    new ForkTsCheckerWebpackPlugin(),
  ],
  //这个配置用于开启热更新，如果要支持IE，就注释掉，否则打开
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    port: 8000,
    historyApiFallback: true,
    //启用热更新
    liveReload: true,
    hot: true,
    client: {
      overlay: false,
      logging: 'none',
    },
    //todo
    open: `/portal/404`,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      //todo
      '/api': {
        target: 'http://119.3.170.85:30080',
        // target: 'http://10.110.10.35:10300',
        changeOrigin: true,
        pathRewrite: (path) => {
          // const rewritePath = path.replace(/^(\/api)+/g, '');
          // eslint-disable-next-line no-console
          console.log('/api/ path', path);
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
          return path;
        },
      },
    },
  } as Configuration,
});

export default dev;
