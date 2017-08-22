const path = require('path'),
      webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src/index.js')
  ],

  output: {
    path: path.join(__dirname + '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  target: 'web',

  devServer: {
    contentBase: './src'
  },

  module: {
    loaders: [
      {test: /\.css$/, exclude: /node_modules/, loader: ['style-loader', 'css-loader']},
			{test: /\.scss$/, exclude: /node_modules/, loader: ['style-loader', 'css-loader', 'sass-loader']},
			{test: /\.(png|jpg)$/, loader: ['url-loader']}
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
