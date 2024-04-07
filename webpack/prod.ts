import * as path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
//@ts-ignore
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import commonConf from './common';

const prod = merge(commonConf, {
  mode: 'production',
  devtool: 'nosources-source-map',
  bail: true,
  optimization: {
    minimize: true,
    // moduleIds: 'hashed',
    // chunkIds: 'named',
    splitChunks: {
      chunks: 'all', // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public/favicon.ico'),
          to: 'favicon.ico',
        },
      ],
    }),
  ],
});

export default prod;
