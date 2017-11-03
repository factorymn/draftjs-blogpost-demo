var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var port = '3033';
var localIp = 'localhost';

module.exports = {
  localPort: port,
  localIp: localIp,
  context: path.resolve(__dirname, '..'),
  devtool: 'cheap-inline-module-source-map',
  entry: {
    'main': [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      './src/app.js',
    ]
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: 'http://' + localIp + ':' + port + '/',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.styl|\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]',
              sourceMap: true
            }
          },
          {
            loader: 'autoprefixer-loader'
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  target: 'web',
  stats: true
};
