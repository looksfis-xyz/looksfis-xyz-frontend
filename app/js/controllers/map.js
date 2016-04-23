'use strict';

angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.categories = {}
  var oldZoom = null;
  var oldCenter = null;
  $scope.center_coords = null;

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
    google.maps.event.addListener($scope.map, 'dragend', function(){
      $scope.center_coords = $scope.map.getCenter().toUrlValue();
      console.log($scope.center_coords);
    });

    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
          map: $scope.map,
          position: latLng,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6,
            strokeWeight: 2,
            fillColor: '#0ac9fb',
            strokeColor: 'black',
            fillOpacity: 1
          }
      });
    });
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