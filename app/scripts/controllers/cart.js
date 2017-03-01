'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('CartCtrl', ['$scope', '$sessionStorage', 'utilityService', function ($scope, $sessionStorage, utilityService) {

    $scope.sessionStorage = $sessionStorage;

    $scope.cartTotalPrice = function() {
      console.log('cart total price', utilityService.calculateTotal())
      return utilityService.calculateTotal()
    };

    $scope.decrementItemCount = function(item) {
      utilityService.decrement(item)
    };
    $scope.incrementItemCount = function(item) {
      utilityService.increment(item)
    }
    
    

  }]);
