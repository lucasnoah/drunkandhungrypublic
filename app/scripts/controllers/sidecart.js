'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:SidecartCtrl
 * @description
 * # SidecartCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('SideCartCtrl', ['$scope', '$sessionStorage',
    'utilityService', 'usSpinnerService', 'MIN_ORDER_AMOUNT', 'OPEN_HOURS',
    function ($scope,
              $sessionStorage,
              utilityService, usSpinnerService, MIN_ORDER_AMOUNT, OPEN_HOURS) {

    $scope.showErrorMessage = false;
    $scope.sessionStorage = $sessionStorage;
    $scope.minOrderAmount = MIN_ORDER_AMOUNT;

    $scope.cartTotalPrice = function() {
      return utilityService.calculateTotal()
    };

    $scope.decrementItemCount = function(item) {
      utilityService.decrement(item)
    };
    $scope.incrementItemCount = function(item) {
      utilityService.increment(item)
    };


    // handle inventory checking for each order
    function checkCartForAvailability(){
      $sessionStorage.beerLoader = true;
      console.log('min order amount', utilityService.calculateTotal());
      if(!$scope.sessionStorage.region.active){
        $sessionStorage.beerLoader = false;
        alert("The site is currently closed.  Our hours run " + OPEN_HOURS + '.')
      }
      if (utilityService.calculateTotal() < MIN_ORDER_AMOUNT){
        alert('please meet the minimum delivery order.')
      }

      else{
        $scope.beerLoader=true;
        $scope.beerLoaderMessage="Checking your order"
        return utilityService.checkOrderAvailability();
      }



    }

    $scope.checkCartAndMoveOn = checkCartForAvailability;

  }])
