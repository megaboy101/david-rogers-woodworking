const fs = require('fs'),
      cheerio = require('cheerio');

fs.readFile('src/index.html', 'utf8', (err, markup) => {
	if (err)
		console.log(err);

	const $ = cheerio.load(markup);

	$('head').prepend('<link rel="stylesheet" href="styles.css">');

	fs.writeFile('dist/index.html', $.html(), 'utf8', err => {
		if (err)
			console.log(err);
		console.log('HTML file written to /dist');
		console.log(__dirname);
	});
});
