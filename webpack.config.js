const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode? 'development' : 'production',
  devServer: {
    compress: true,
    port: 9000
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      titile: '从 service-worker 到 workbox',
      template: path.resolve(__dirname, 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: path.resolve(__dirname, 'src/markdowns'), to: path.resolve(__dirname, 'dist/markdowns') },
      { from: path.resolve(__dirname, 'src/reveal'), to: path.resolve(__dirname, 'dist/reveal') },
      { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') },
      { from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist/favicon.ico') },
    ]),
    // new WorkboxPlugin.GenerateSW({
    //   swDest: 'service-worker.js',
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/service-worker.js',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
};