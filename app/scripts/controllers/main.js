'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('MainCtrl', ['$scope',  '$sessionStorage',
    'userService', 'utilityService', '$location', 'MIN_ORDER_AMOUNT', 'OPEN_HOURS', function($scope,
                                              $sessionStorage, userService, utilityService, $location, MIN_ORDER_AMOUNT,
    OPEN_HOURS) {

      $scope.regionActive = false;
      $scope.storage= $sessionStorage;
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


    $scope.itemListArray = {
      received: false
    };

    // CATEGORY LOGIC
    $scope.currentCategory = '';
    $scope.showCategory = function(category){
      if(category==$scope.currentCategory){
        $scope.currentCategory = '';
      }
      else{
        $scope.currentCategory = category;
      }

    }

    $scope.checkoutButtonVisibility = false;

    // initial value
    $scope.items = {};

    var getItemList = function() {
      // TODO: do we need this?
    }

    var initializePage = function() {
      console.log('INIT MAIN HTML')
      console.log('sessionStorage at main: ', $sessionStorage)

      $scope.storage.beerGuyMessage = "Mmmmmmm! Your desires are waiting to be satisfied.  Order on buddy!";
      $scope.storage.beerLoader = false;
      utilityService.initSessionOnMainPage()
      .then(function(res) {
        $scope.itemListArray.data = $sessionStorage.itemsListArray;
        $scope.categories = [];

        angular.forEach($scope.itemListArray.data, function(val, key  ){
          // build list of categories
          if ($scope.categories.indexOf(val['category'])==-1){
            $scope.categories.push(val['category'])
          }
        });

        $scope.itemListArray.recieved = true;
      })



      // getItemList()
      // .then(function(itemsFromServer) {
      //   $scope.items = itemsFromServer
      //   return initializeSessionStorageCounters()
      // })
      // .then(function() {
      //   $scope.sessionStorage = $sessionStorage
      // })
    }

    $scope.navigateToCart = function(){
      if(!$scope.storage.region.active){
        alert("The site is currently closed.  Our hours run " + OPEN_HOURS + '.' )
      }
      else{
        $location.path("/cart")
      }

    }
    initializePage()



  }]);
