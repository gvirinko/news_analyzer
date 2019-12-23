const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';



module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader"
              }
          },
          {
              test: /\.css$/i,
              use: [
                  (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                  'css-loader',
                  'postcss-loader'
              ]
          },
          {
            test: /\.(png|jpe?g|gif|ico|svg)$/i,
            use: [
              'file-loader?name=images/[name].[ext]',
              {
                loader: 'image-webpack-loader',
                options: {
                  bypassOnDebug: true,
                  disable: true
                }
              }
            ]
          },
          {
              test: /\.(eot|ttf|woff|woff2)$/,
              loader: 'file-loader?name=./fonts/[name].[ext]'
          },
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: 'style.[contenthash].css',
      }),

      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
                  preset: ['default'],
          },
          canPrint: true
      }),

      new WebpackMd5Hash(),

      new HtmlWebpackPlugin({
          inject: false,
          template: './src/index.html',
          filename: 'index.html'
      }),

      new HtmlWebpackPlugin({
        inject: false,
        template: './src/about.html',
        filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/analytics.html',
      filename: 'analytics.html'
  }),

      new webpack.DefinePlugin({
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
  ]
};
