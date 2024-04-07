import * as path from 'path';
//@ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import webpack from 'webpack';

const common: webpack.Configuration = {
  entry: {
    index: path.join(__dirname, '../src/main.ts'),
  },
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/portal/', //todo
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: false,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: false,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: false,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports an async import() when creating a worker, only for web targets at the moment.
      dynamicImportInWorker: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: false,
      // The environment supports 'globalThis'.
      globalThis: false,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: false,
      // The environment supports template literals.
      templateLiteral: false,
    },
  },
  target: ['web', 'es5'],
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
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.[jt]s$/,
        include: [path.resolve(__dirname, '../src'), /node_modules/],
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.woff$/, /\.ttf$/],
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
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
              additionalData: '@import "./src/styles/variables.scss";',
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
    }),
    new VueLoaderPlugin(),
  ],
};

export default common;
