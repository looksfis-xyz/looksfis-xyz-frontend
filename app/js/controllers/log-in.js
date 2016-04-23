'use strict';

angular.module('starter')

.controller('LogInCtrl', function($scope, $ionicPopup, $http, $location, ENV, $window) {
  $scope.user = {};

  $scope.logIn = function() {
    $http.post(ENV.apiEndpoint +'/login', { user: { email: $scope.user.email, password: $scope.user.password } })
    .then(function(response) {
      $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
      $scope.user = {};
      $location.path('/map');
    }).catch(function(err) {
      console.log(err);
      $ionicPopup.alert({
        title: 'Could not login',
        template: 'Please try again'
      });
    });
  }
})
