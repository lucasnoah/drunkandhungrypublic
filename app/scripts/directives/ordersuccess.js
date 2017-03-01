'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:orderSuccess
 * @description
 * # orderSuccess
 */
angular.module('drunkandhungryApp')
  .controller('orderSuccessCtrl', function($scope, $sessionStorage){
    $scope.storage = $sessionStorage;
    $scope.storage.beerGuyMessage = "We won't wait!"

  })
  .directive('orderSuccess', function () {
    return {
      templateUrl: 'views/orderSuccessDirective.html',
      restrict: 'E',
      controller: 'orderSuccessCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
