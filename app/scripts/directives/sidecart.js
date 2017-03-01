'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:sidecart
 * @description
 * # sidecart
 */

angular.module('drunkandhungryApp')
  .directive('sidecart', function () {
    return {
      templateUrl: 'views/sidecart.html',
      restrict: 'E',
      controller: 'SideCartCtrl',
      scope: {
        items: '=',
        cartcount: '=',
        cartitemcount:'='
      }
    };
  });
