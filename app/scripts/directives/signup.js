'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:signup
 * @description
 * # signup
 */
angular.module('drunkandhungryApp')
  .directive('signup', function () {
    return {
      templateUrl: 'views/signupDirective.html',
      restrict: 'E',
      controller: 'SignupDirectiveCtrl'
    };
  });
