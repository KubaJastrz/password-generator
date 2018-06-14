const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = '';

const server = {
  host: '0.0.0.0',
  port: 8080,
  https: false,
};

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './src/index.js'
  ],

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  },

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
          { loader: 'postcss-loader', options: {
            plugins: [
              require('autoprefixer')()
            ]
          }},
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
    host: server.host,
    port: server.port,
    https: server.https,
    before() {
      const ip = require('internal-ip').v4.sync();
      const protocol = server.https ? 'https' : 'http';

      const log = console.log;

      log();
      log('App running on:');
      log(chalk.blue(`  ${protocol}://localhost:${server.port}`));
      log(chalk.blue(`  ${protocol}://${ip}:${server.port}`));
      log();
    }
  }
};