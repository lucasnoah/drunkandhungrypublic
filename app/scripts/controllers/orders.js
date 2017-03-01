'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:OrdersCtrl
 * @description
 * # OrdersCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')

  .controller('OrdersCtrl', function ($scope, $log, userService, $sessionStorage, utilityService) {

    $scope.sessionStorage = $sessionStorage;
    $scope.sessionStorage.beerLoader = true;
     $scope.sessionStorage.beerLoaderMessage = "Fetching Orders";
    userService.fetchUserOrders().success(function(d){
      
     
      $scope.sessionStorage.beerLoader = false;
      $scope.sessionStorage.userOrders = d;
    }).error(function(e){
      $scope.sessionStorage.beerLoader = false;
    });

    $scope.cancelOrder = function(orderId){
      utilityService.cancelOrder(orderId)
    }

  });
