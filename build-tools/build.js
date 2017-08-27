const webpack = require('webpack'),
      config = require('../webpack.config.prod.js');

process.env.NODE_ENC = 'production';

console.log('Starting production build process, this may take a while...');

webpack(config).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }

  const buildStats = stats.toJson();

  if (buildStats.hasErrors) {
    console.error('Compiling error!');
    return 1;
  }

  if (buildStats.hasWarnings) {
		console.log('Loading with warnings.');
	}

  console.log('Webpack stats: ' + stats);
	console.log('Successfully compiled!');
	return 0;
});
