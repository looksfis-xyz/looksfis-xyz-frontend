'use strict';

angular.module('starter')

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $http, $location, ENV, $window) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.categories = {}
  $scope.center_coords = null;

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      rotateControl: false,
      mapTypeControl:false,
      streetViewControl: false
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

  $scope.addLostItem = function() {
    console.log("ADD CLICKED");
  }
  $scope.searchLostItems = function() {
    var categories_array = [];
    if ($scope.categories.net) {
      categories_array.push(1)
    }
    if ($scope.categories.pot) {
      categories_array.push(2)
    }
    if ($scope.categories.rod) {
      categories_array.push(3)
    }
    var latlngArray = $scope.center_coords.split(',');
    var params = {
      lattitude: Number(latlngArray[0]),
      longitude: Number(latlngArray[1]),
      categories: categories_array,
      radius: 0.5,
    };

    console.log(params);

    $http.get(ENV.apiEndpoint + '/posts', {params: params}).then(function(response){
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    })

  }
});