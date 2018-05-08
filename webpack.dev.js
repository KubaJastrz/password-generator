const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '';

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    './src/index.js'
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'PUBLIC_URL': JSON.stringify(publicPath)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      publicPath: publicPath
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true,
    overlay: true,
    stats: {
      colors: true,
      chunks: false,
      hash: false,
      version: true,
      modules: false
    },
    host: '0.0.0.0',
    port: 8080
  }
};