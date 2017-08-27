const express = require('express'),
      path = require('path'),
      compression = require('compression');

const port = process.env.PORT || 3000,
      app = express();


app.use(compression());
app.use(express.static('dist'));


app.get('*', (req, res) => (
  res.sendFile(path.join(__dirname, '../dist/index.html'))
));

app.listen(port, () => (
  console.log(`Production server started on port ${port}`)
));
