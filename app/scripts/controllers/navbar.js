'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('NavbarCtrl', ['$scope', '$sessionStorage', '$auth', '$window', function ($scope, $sessionStorage, $auth, $window) {
    $scope.sessionStorage = $sessionStorage
    $scope.isAuthenticated = $auth.isAuthenticated();
    $scope.submenu = false;


    $scope.toggleSubmenu = function(){
      if($scope.submenu == false){
        $scope.submenu = true;
      }
      else{
        $scope.submenu = false
      }
    }

    $scope.logout = function() {
      $auth.logout();
      $scope.isAuthenticated = $auth.isAuthenticated();
      $sessionStorage.$reset();
    }
  }]);
