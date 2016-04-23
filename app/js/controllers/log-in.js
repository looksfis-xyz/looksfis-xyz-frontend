'use strict';

angular.module('starter')

.controller('LogInCtrl', function($scope, $ionicPopup, $http, $location) {
  $scope.user = {};

  $scope.logIn = function() {
    $http.get('FILLINURL', { params: { username: $scope.user.username, password: $scope.user.password } })
    .then(function(response) {
      $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
      $scope.user = {};
      $location.path('/tab/create-post');
    }).catch(function(err) {
      console.log(err);
      $ionicPopup.alert({
        title: 'Could not login',
        template: 'Please try again'
      });
    });
  }
})
