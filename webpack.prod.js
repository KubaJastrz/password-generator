const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env = {}) => {
  const publicPath = env.local === true ? '/' : '/password-generator/';

  return {
    bail: true,
    mode: 'production',

    entry: {
      // vendor: [
      //   'babel-polyfill',
      //   'classnames',
      //   'focus-visible',
      //   'modern-normalize',
      //   'prop-types',
      //   'react',
      //   'react-dom',
      //   'react-modal',
      //   'react-redux',
      //   'redux',
      //   'webfontloader'
      // ],
      main: './src/index.js'
    },

    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'static/[name].[contenthash:8].js',
      // chunkFilename: 'static/[name].[chunkhash:8].chunk.js',
      publicPath: publicPath
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
            MiniCssExtractPlugin.loader,
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

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          cache: true,
          sourceMap: true,
          uglifyOptions: {
            output: {
              comments: false
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {
            discardComments: {
              removeAll: true
            }
          }
        })
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            test: /[\\/]node_modules[\\/]/,
            // test: 'vendor',
            enforce: true
          }
        }
      },
      runtimeChunk: false
    },
    
    plugins: [
      new CleanWebpackPlugin(['dist/static/*']),
      new CopyWebpackPlugin([{
        from: 'public',
        ignore: ['index.html']
      }]),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'PUBLIC_URL': JSON.stringify(publicPath)
        }
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        publicPath: publicPath.slice(0,-1),
        minify: {
          removeComments: true,
          collapseWhitespace: true
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
  };
};