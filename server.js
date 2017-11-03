/* eslint-disable */
var express = require('express');
var webpack = require('webpack');

var webpackConfig = require('./webpack/webpack.dev.config.js');

var localIp = webpackConfig.localIp;
var localPort = webpackConfig.localPort;

delete webpackConfig.localIp;
delete webpackConfig.localPort;

const compiler = webpack(webpackConfig);

let app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use((req, res) => {
  res.status(200).sendFile(__dirname + '/index.html')
});

app.listen(localPort, () => {
  console.info(`==> Open up http://${ localIp }:${ localPort }/ in your browser.`)
});
