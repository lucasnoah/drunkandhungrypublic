'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:beerLoader
 * @description
 * # beerLoader
 */
angular.module('drunkandhungryApp')
  .controller('beerLoaderCtrl', function($scope, $sessionStorage){
    $scope.storage = $sessionStorage;
  })
  .directive('beerLoader', function () {
    return {
      templateUrl: 'views/beerLoaderDirective.html',
      restrict: 'E',
      controller: 'beerLoaderCtrl',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
