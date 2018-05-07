const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common');

const isLocal = process.env.local === 'true';
const publicPath = isLocal ? '/' : '/password-generator/';

module.exports = merge(common, {
  bail: true,
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'static/[name].[chunkhash:8].js',
    chunkFilename: 'static/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath
  },

  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendor',
    //       chunks: 'initial',
    //       test: /[\\/]node_modules[\\/]/,
    //       enforce: true
    //     }
    //   }
    // }
  },
  
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin(['public']),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PUBLIC_URL': JSON.stringify(publicPath)
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[chunkhash:8].css'
    }),
    new SWPrecachePlugin({
      filename: 'sw.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/]
    })
  ]
});