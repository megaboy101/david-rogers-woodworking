const express = require('express'),
      webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      path = require('path'),
      config = require('../webpack.config.dev.js');

const port = process.env.PORT || 3000,
      app = express(),
      compiler = webpack(config);


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));


app.get('/', (req, res) => (
  res.sendFile(path.join(__dirname, '../src/index.html'))
));

app.listen(port, () => (
  console.log(`Dev server started on port ${port}, please wait for webpack to compile`)
));
