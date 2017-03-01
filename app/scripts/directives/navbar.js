'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:navBar
 * @description
 * # navBar
 */
angular.module('drunkandhungryApp')
  .directive('navbar', function () {
    return {
      templateUrl: 'views/navbar.html',
      restrict: 'E',
      controller: 'NavbarCtrl'
    };
  });
