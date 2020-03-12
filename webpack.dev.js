const merge = require('webpack-merge');
const config = require('./webpack.base');

console.log(process.env.NODE_ENV);
module.exports = merge(config, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
});