const webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      path = require('path');

const GLOBALS = {
	'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
	entry: {
    common: ['angular'],
    app: path.join(__dirname, 'src/index.js')
  },

	output: {
		path: path.join(__dirname + '/dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},

	target: 'web',

	devtool: 'sourcemap',

	devServer: {
		contentBase: './dist'
	},

	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    }),
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin('styles.css'),
		new webpack.optimize.UglifyJsPlugin()
	],

	module: {
		loaders: [
			{test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('css?sourceMap')},
			{test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
			{test: /\.(png|jpg)$/, loader: ['url-loader']}
		]
	}
};
