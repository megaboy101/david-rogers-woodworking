require('./stylesheets/main.scss');
var angular = require('angular');
var requestSection = require('./api.js');

var img = document.getElementById('galleryImg');
img.src = require('./assets/gallery.png');


var app = angular.module('app', []);

app.controller('HeaderCtrl', ['$scope', HeaderCtrl]);
app.controller('ServiceCtrl', ['$scope', ServiceCtrl]);
app.controller('GalleryCtrl', ['$scope', GalleryCtrl]);
app.controller('TestimonyCtrl', ['$scope', TestimonyCtrl]);
app.controller('ContactCtrl', ['$scope', ContactCtrl]);
app.controller('FooterCtrl', ['$scope', FooterCtrl]);

function HeaderCtrl($scope) {

  requestSection('header').then(function(data) {
    $scope.backgroundImage = data.backgroundImage;
    $scope.title = data.title;
    $scope.subTitle = data.subTitle;
    $scope.$apply();
  });
};

function ServiceCtrl($scope) {
  requestSection('services').then(function(data) {
    $scope.header = data.header;
    $scope.services = data.services;
    $scope.$apply();
  });
};

function GalleryCtrl($scope) {
  var images = [],
      currentImageIndex = 0;

  requestSection('gallery').then(function(data) {
    images = data.images;
    $scope.currentImage = images[currentImageIndex];
    $scope.$apply();
  });

  $scope.nextImage = function() {
    $scope.currentImage = images[currentImageIndex++];
  }

  $scope.previousImage = function() {
    $scope.currentImage = images[currentImageIndex--];
  }
};

function TestimonyCtrl($scope) {
  $scope.testimonies = [];

  requestSection('testimony').then(function(data) {
    $scope.testimonies = data.testimonies;
    $scope.backgroundImage = data.backgroundImage;
    $scope.currentTestimony = $scope.testimonies[0];
    $scope.currentTestimonyIndex = 0;
    $scope.$apply();
  });

  $scope.setTestimony = function(index) {
    $scope.currentTestimony = $scope.testimonies[index];
    $scope.currentTestimonyIndex = index;
  };
};

function ContactCtrl($scope) {
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
};

function FooterCtrl($scope) {
  requestSection('footer').then(function(data) {
    $scope.endQuote = data.endQuote;
    $scope.quoteDedication = data.quoteDedication;
    $scope.webAddress = data.webAddress;
    $scope.phoneNumber = data.phoneNumber;
    $scope.$apply();
  });
};
