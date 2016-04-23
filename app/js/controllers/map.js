'use strict';

angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.categories = {}

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error){
    console.log("Could not get location");
  });

  $scope.typeSelected = function(type) {
    if (type === 'net') {
      $scope.categories.net = !$scope.categories.net
    } else if (type == 'pot') {
      $scope.categories.pot = !$scope.categories.pot
    } else if (type == 'rod') {
      $scope.categories.rod = !$scope.categories.rod
    }
  }
});