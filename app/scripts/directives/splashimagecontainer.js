'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:splashImageContainer
 * @description
 * # splashImageContainer
 */
angular.module('drunkandhungryApp')
  .controller('splashImageContainerCtrl', function($scope){

  })
  .directive('splashImageContainer', function () {
    return {
      templateUrl: 'views/splashImageContainerDirective.html',
      restrict: 'E',
      controller: 'splashImageContainerCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
