const express = require('express'),
      webpack = require('webpack'),
      sendgrid = require('sendgrid')
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      path = require('path'),
      bodyParser = require('body-parser'),
      config = require('../webpack.config.dev.js');

const port = process.env.PORT || 3000,
      app = express(),
      compiler = webpack(config),
      mailer = sendgrid('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');


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => (
  res.sendFile(path.join(__dirname, '../src/index.html'))
));

app.post('/api/email', (req, res) => {
  console.log(req.body.name);

  const mail = mailer.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [{ email: 'jacobbleser@aol.com' }],
          subject: 'Business Inquiry'
        }
      ],
      from: {
        email: req.body.email
      },
      content: [{
        type: 'text/plain',
        value:
        `Name: ${req.body.name}
        Number: ${req.body.number}
        Company: ${req.body.company}

        ${req.body.message}
        `
      }]
    }
  });

  mailer.API(mail)
  .then(res => console.log(res.body))
  .catch(err => console.log(err));
});

app.listen(port, () => (
  console.log(`Dev server started on port ${port}, please wait for webpack to compile`)
));
