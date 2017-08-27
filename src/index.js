require('./stylesheets/main.scss');
var angular = require('angular');
var requestSection = require('./api.js');

var img = document.getElementById('galleryImg');
img.src = require('./assets/gallery.png');


var app = angular.module('app', []);

app.controller('HeaderCtrl', function($scope) {

  requestSection('header').then(function(data) {
    $scope.title = data.title;
    $scope.subTitle = data.subTitle;
    $scope.$apply();
  });
});

app.controller('ServiceCtrl', function($scope) {
  requestSection('services').then(function(data) {
    $scope.header = data.header;
    $scope.services = data.services;
    $scope.$apply();
  });
});

app.controller('GalleryCtrl', function($scope) {
  var images = [],
      currentImageIndex = 0;

  requestSection('gallery').then(function(data) {
    images = data.images;
    $scope.currentImage = images[currentImageIndex];
    console.log($scope.currentImage.image);
    $scope.$apply();
  });

  $scope.nextImage = function() {
    $scope.currentImage = images[currentImageIndex++];
  }

  $scope.previousImage = function() {
    $scope.currentImage = images[currentImageIndex--];
  }
});

app.controller('TestimonyCtrl', function($scope) {
  $scope.testimonies = [];

  requestSection('testimony').then(function(data) {
    $scope.testimonies = data.testimonies;
    $scope.currentTestimony = $scope.testimonies[0];
    $scope.currentTestimonyIndex = 0;
    $scope.$apply();
  });

  $scope.setTestimony = function(index) {
    $scope.currentTestimony = $scope.testimonies[index];
    $scope.currentTestimonyIndex = index;
  };
});

app.controller('ContactCtrl', function($scope) {
  $scope.name = "";
  $scope.number = "";
  $scope.company = "";
  $scope.email = "";
  $scope.message = "";

  requestSection('contact').then(function(data) {
    $scope.header = data.header;
  });

  $scope.formattedEmail = function() {
    var currentMessage = $scope.message;

    return (
      'mailto:davidrogers111@earthlink.net?subject=Website%20Inquiry&body=' +
      currentMessage.split(" ").join("%20")
    );
  }
});

app.controller('FooterCtrl', function($scope) {
  requestSection('footer').then(function(data) {
    $scope.endQuote = data.endQuote;
    $scope.quoteDedication = data.quoteDedication;
    $scope.webAddress = data.webAddress;
    $scope.phoneNumber = data.phoneNumber;
    $scope.$apply();
  });
});
