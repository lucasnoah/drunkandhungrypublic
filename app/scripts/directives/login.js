'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:login
 * @description
 * # login
 */
angular.module('drunkandhungryApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/loginDirective.html',
      restrict: 'E',
      controller: 'LoginDirectiveCtrl'
    };
  });
