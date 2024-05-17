import * as path from 'path';
//@ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { consoleFormat } from '@szhou/script-tools';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import packageJSON from '../package.json';

consoleFormat();

const common: webpack.Configuration = {
  entry: {
    polyfill: ['core-js/stable'],
    index: path.join(__dirname, '../src/main.ts'),
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: '/', //todo
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    library: `${packageJSON.name}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${packageJSON.name}`,
    globalObject: 'window',
  },
  target: ['web'],
  resolve: {
    extensions: ['.ts', '.vue', '.json', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
    fallback: { os: false, path: require.resolve('path-browserify'), fs: false },
  },
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, '../node_modules/.cache/webpack'),
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            jsx: true,
          },
        },
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, '../node_modules/.pnpm/element-plus'), 
          path.join(__dirname, '../node_modules/element-plus'), 
          path.join(__dirname, '../src')
        ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@use "./src/styles/variables.scss" as *;',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, '../public/index.html'),
    }),
    new ProgressBarPlugin(),
    new webpack.ProvidePlugin({}),
    new webpack.DefinePlugin({
      process: { env: {} },
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    }),
    new VueLoaderPlugin(),
  ],
};

export default common;
