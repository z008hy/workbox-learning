const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      titile: '从 service-worker 到 workbox',
      template: path.resolve(__dirname, 'index.html'),
    }),
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
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      // exclude: [/\.(?:png)$/],
      // include: ['/assets/images/workbox-cache-only.png']
    })
  ],
  module: {
    rules: [
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