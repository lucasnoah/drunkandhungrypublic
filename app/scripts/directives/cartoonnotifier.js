'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:cartoonNotifier
 * @description
 * # cartoonNotifier
 */
angular.module('drunkandhungryApp')
  .controller('cartoonNotifierCtrl', function($scope, $sessionStorage){
    $scope.storage = $sessionStorage;
    

  })
  .directive('cartoonNotifier', function () {
    return {
      templateUrl: 'views/cartoonNotifierDirective.html',
      restrict: 'E',
      controller: 'cartoonNotifierCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
