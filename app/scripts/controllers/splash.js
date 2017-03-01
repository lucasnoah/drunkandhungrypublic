'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:SplashCtrl
 * @description
 * # SplashCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('SplashCtrl', function ($scope, $sessionStorage, OPEN_HOURS) {
    $scope.storage = $sessionStorage;
    $scope.openHours = OPEN_HOURS;
    $scope.splashIt = function(){
      console.log('splashit');
    }
  });
