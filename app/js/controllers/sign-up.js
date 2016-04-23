'use strict';

angular.module('starter')

.controller('SignUpCtrl', function($scope, $ionicPopup, $http, $location) {
  $scope.user = {};

  $scope.signUp = function() {
    $http.post('FILLINURL', { user: $scope.user })
    .then(function(response) {
      $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
      $scope.user = {};
      $location.path('/tab/create-post');
    }).catch(function(err) {
      console.log(err);
      $ionicPopup.alert({
        title: 'Could not sign up',
        template: 'Please try again'
      });
    });
  }
})
