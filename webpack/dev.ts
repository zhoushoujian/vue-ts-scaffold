import path from 'path';
import webpack from 'webpack';
//@ts-ignore
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import commonConf from './common';

const dev = merge(commonConf, {
  //@ts-ignore
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    entrance: ['webpack-hot-middleware/client?name=pure', path.join(__dirname, '../src/main.ts')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BABEL_ENV': JSON.stringify('development'),
      isDev: 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  // devServer: {
  //   historyApiFallback: true,
  //   host: '0.0.0.0',
  // },
  target: 'web',
});

export default dev;
