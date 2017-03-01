'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:productDetailModal
 * @description
 * # productDetailModal
 */
angular.module('drunkandhungryApp')
  .controller('productDetailModalCtrl', function($scope, $sessionStorage, product){


  })
  .directive('productDetailModal', function () {
    return {
      templateUrl: 'views/productDetailModal.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
