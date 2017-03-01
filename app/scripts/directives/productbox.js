'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:productBox
 * @description
 * # productBox
 */
angular.module('drunkandhungryApp')
  .controller('productInfoModalCtrl', function($scope, product, $sessionStorage, $uibModalInstance, utilityService){
    $scope.storage = $sessionStorage;
    $scope.product = product;
  $scope.close = function(){
    return $uibModalInstance.dismiss('');
  }



  $scope.productDetailData = {};
    $scope.productDetailFields = [
      {
        type: "input",
        key: "quantity",
        defaultValue: 1,
        templateOptions: {
          type: "number", // or url, or text, etc.
          label:"Quantity"
        }
      }
    ];

    $scope.addToCart = function(){
      console.log('trigger add to cart')
      var quantity = $scope.productDetailData.quantity;
      utilityService.incrementByX($scope.product, quantity);
      return $uibModalInstance.dismiss('');
    }
  })
  .controller('productBoxCtrl', function($scope, $sessionStorage, $uibModal){


    $scope.sessionStorage = $sessionStorage;
    $scope.showProductDetail = function(product) {

      var modalInstance = $uibModal.open({
        templateUrl: 'views/productDetailModal.html',
        controller: 'productInfoModalCtrl',

        resolve: {
          product: function () {
            return product
          }
        }
      });
      return modalInstance
    };

  })

  .directive('productBox', function () {
    return {
      templateUrl: 'views/productBoxDirective.html',
      restrict: 'E',
      controller: 'productBoxCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
