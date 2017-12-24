require('./stylesheets/main.scss');
var angular = require('angular');
var api = require('./api.js');

var img = document.getElementById('galleryImg');
img.src = require('./assets/gallery.png');


var requestSection = api.requestSection;
var sendEmail = api.sendEmail
var app = angular.module('app', []);

app.controller('HeaderCtrl', ['$scope', HeaderCtrl]);
app.controller('ServiceCtrl', ['$scope', ServiceCtrl]);
app.controller('GalleryCtrl', ['$scope', GalleryCtrl]);
app.controller('TestimonyCtrl', ['$scope', TestimonyCtrl]);
app.controller('ContactCtrl', ['$scope', ContactCtrl]);
app.controller('FooterCtrl', ['$scope', FooterCtrl]);

function HeaderCtrl($scope) {
  $scope.loaded = false;
  $scope.title = "";
  $scope.subTitle = "";

  requestSection('header').then(function(data) {
    $scope.backgroundImage = data.backgroundImage;
    $scope.title = data.title;
    $scope.subTitle = data.subTitle;
    $scope.loaded = true;
    $scope.$apply();
  });
};

function ServiceCtrl($scope) {
  $scope.loaded = false;
  $scope.header = "";
  $scope.services = "";

  requestSection('services').then(function(data) {
    $scope.header = data.header;
    $scope.services = data.services;
    $scope.loaded = true;
    $scope.$apply();
  });
};

function GalleryCtrl($scope) {
  $scope.currentImageIndex = 0;
  $scope.images = [];

  $scope.loaded = false;

  requestSection('gallery').then(function(data) {
    $scope.images = data.images;
    $scope.currentImage = $scope.images[$scope.currentImageIndex];
    $scope.loaded = true;
    $scope.$apply();
  });

  $scope.nextImage = function() {
    if ($scope.currentImageIndex + 1 === $scope.images.length)
      $scope.currentImageIndex = -1;
    $scope.currentImageIndex += 1;
    $scope.currentImage = $scope.images[$scope.currentImageIndex];
  }

  $scope.previousImage = function() {
    if (currentImageIndex - 1 === -1)
      currentImageIndex = $scope.images.length;
    currentImageIndex -= 1;
    $scope.currentImage = $scope.images[currentImageIndex--];
  }
};

function TestimonyCtrl($scope) {
  $scope.testimonies = [];
  $scope.loaded = false;
  $scope.testimonies = "";

  requestSection('testimony').then(function(data) {
    $scope.testimonies = data.testimonies;
    $scope.backgroundImage = data.backgroundImage;
    $scope.currentTestimony = $scope.testimonies[0];
    $scope.currentTestimonyIndex = 0;
    $scope.loaded = true;
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
  $scope.loaded = false;

  requestSection('contact').then(function(data) {
    $scope.header = data.header;
    $scope.loaded = true;
  });

  $scope.sendEmail = function() {
    var currentMessage = $scope.message;

    api.sendEmail($scope.name, $scope.number, $scope.company, $scope.email, currentMessage);
  }
};

function FooterCtrl($scope) {
  $scope.loaded = false;

  requestSection('footer').then(function(data) {
    $scope.endQuote = data.endQuote;
    $scope.quoteDedication = data.quoteDedication;
    $scope.webAddress = data.webAddress;
    $scope.phoneNumber = data.phoneNumber;
    $scope.loaded = true;
    $scope.$apply();
  });
};
