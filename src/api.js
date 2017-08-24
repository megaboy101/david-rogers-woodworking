var $ = require('jquery');

var client = require('contentful').createClient({
  space: 'octbv27cogtl',
  accessToken:  'db16dc7bb4186ff2c5579cde6924a47765c7b1bbc18b65eb6826891e50051a52'
});

module.exports = function(content) {
  return new Promise(function(res, rej) {
    client.getEntries({
      content_type: content
    })
    .then(function(data) {
      switch(content) {
        case 'header':
          res(parseHeader(data));
          break;
        case 'services':
          res(parseServices(data));
          break;
        case 'gallery':
          res(parseGallery(data));
          break;
        case 'testimony':
          res(parseTestimony(data));
        case 'footer':
          res(parseFooter(data));
      }
    });
  });
};


var parseHeader = function(data) {
  return {
    // Parse that data!
  };
};

var parseServices = function(data) {
  return {
    // Parse that data!
  };
}

var parseGallery = function(data) {
  return {
    // Parse that data!
  };
}

var parseTestimony = function(data) {
  return {
    // Parse that data!
  };
}

var parseFooter = function(data) {
  return {
    // Parse that data!
  };
}
