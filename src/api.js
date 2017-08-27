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
      var section = data.items[0].fields;
      switch(content) {
        case 'header':
          res(parseHeader(section));
          break;
        case 'services':
          res(parseServices(section));
          break;
        case 'gallery':
          res(parseGallery(section));
          break;
        case 'testimony':
          res(parseTestimony(section));
          break;
        case 'contact':
          res(parseContact(section));
          break;
        case 'footer':
          res(parseFooter(section));
      }
    });
  });
};


var parseHeader = function(data) {
  console.log(data);
  return {
    title: data.title,
    subTitle: data.subTitle,
    backgroundImage: data.backgroundImage.fields.file.url
  };
};

var parseServices = function(data) {
  return {
    header: data.header,
    services: data.services.map(function(service) { return service.fields; })
  };
}

var parseGallery = function(data) {
  var images = data.galleryImages.map(function(image) {
    return {
      category: image.fields.category,
      image: image.fields.image.fields.file.url
    };
  });

  return {
    images: images
  };
}

var parseTestimony = function(data) {
  return {
    testimonies: data.testimonies.map(function(testimony) {
      return {
        quote: testimony.fields.quote,
        author: testimony.fields.quoted
      }
    }),
    backgroundImage: data.backgroundImage.fields.file.url
  };
}

var parseContact = function(data) {
  return {
    header: data.header
  };
}

var parseFooter = function(data) {
  return {
    endQuote: data.endQuote,
    phoneNumber: data.phoneNumber,
    quoteDedication: data.quoteDedication,
    webAddress: data.webAddress
  };
}
