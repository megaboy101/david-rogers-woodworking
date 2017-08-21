require('./stylesheets/main.scss');
const $ = require('jquery');

$(document).ready(function() {
  $('h1').click(function() {
    console.log('Yay you remember basic jQuery!');
  });
});
