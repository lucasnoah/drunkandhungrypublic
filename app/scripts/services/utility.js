'use strict';

/**
 * @ngdoc service
 * @name drunkandhungryApp.utility
 * @description
 * # utility
 * Service in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .service('utilityService', function ($sessionStorage, userService, $uibModal,
                                       $http, API_BASE, $log, $location, usSpinnerService) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.loginSetup = function() {
      // grab all the data after login
      return new Promise(function(resolve, reject) {
        $sessionStorage.customerData = {};
        $sessionStorage.locationSelectorVisibility = true;
        $sessionStorage.locationStatus = 'Select a location!';

        userService.getCustomerData()
        .then(function(res) {
          $sessionStorage.customerData = res;
          resolve(res);
        });
      });
    };

    function initSessionOnMainPage() {
      // set all of the ui variables for start a session
      return new Promise(function(resolve, reject) {

        if ($sessionStorage.locationSelectorVisibility === undefined) {
          $sessionStorage.locationSelectorVisibility = true;
        }

        // make sure checkout button is visible when location selector is gone
        if (!$sessionStorage.locationSelectorVisibility) {
          $sessionStorage.checkoutButtonVisibility = true;
        }

        resolve();
      });
    };

    this.initSessionOnMainPage = initSessionOnMainPage;

     function initializeCartCounter() {
       // Build the intitial shopping cart counts
      return new Promise(function(resolve, reject) {
        // check if cartIDCount exists
        if ($sessionStorage.cartIDCount === undefined) {
          // if it does not, initialize it
          $sessionStorage.cartIDCount = {};
        }
        if ($sessionStorage.itemsList === undefined) {
          reject();
        }
        var itemsList = $sessionStorage.itemsList
        // loop through each item
        for(var i in itemsList) {
          var thisItem = itemsList[i];
          var id = thisItem.id;
          if ($sessionStorage.cartIDCount[id] === undefined) {
            // if it's ID is not in cartIDCount, initialize it as 0 in cartIDCount
            $sessionStorage.cartIDCount[id] ={
              // set a count and a remaining amount.  This gets added when you move to payment
              count: 0,
              remaining: undefined
            };
          }
        }
        resolve();
      });
    };

    this.initializeCartCounter = initializeCartCounter;
    // rename this: initiate counters
    this.saveItemListToSessionStorage = function(itemsFromServer) {
      return new Promise(function(resolve, reject) {


        var itemsListObject = {};
        for(var i in itemsFromServer) {
          var thisItem = itemsFromServer[i];
          itemsListObject[thisItem.id] = thisItem;
        }
        $sessionStorage.itemsListArray = itemsFromServer;
        $sessionStorage.itemsList = itemsListObject;

        resolve();
      });
    };

    function countCartItems() {
        var cartIDCount = $sessionStorage.cartIDCount;
        var total = 0;
        for(var item in cartIDCount) {
          var thisItem = cartIDCount[item].count;
          if (thisItem) {
            total = total + thisItem;
          }
        }
        $sessionStorage.cartItemCount = total;
        return total;
    }
    this.countCartItems = countCartItems;

    this.calculateTotal = function() {
      var itemsAddedTotal = 0;
      var cartIDCount = $sessionStorage.cartIDCount;
      var itemsAddedTotal = 0;
      for (var itemId in cartIDCount) {
        if (cartIDCount.hasOwnProperty(itemId)) {
          var thisItemQuantity = cartIDCount[itemId].count;
          var thisItemPrice = $sessionStorage.itemsList[itemId].price;
          var thisItemTotal = thisItemPrice * thisItemQuantity;
          itemsAddedTotal = itemsAddedTotal + thisItemTotal;
        }
      }
      return itemsAddedTotal;
    }

    this.calculateCartTotal = function(discountType) {
      var total = this.calculateTotal()
      var discountTypes = {
        fiftyPercentOff: function(){
            return total - 500
        }
      }

      return discountTypes['discountType']
    }



    this.decrement = function(item) {
      if ($sessionStorage.cartIDCount[item.id].count > 0) {
        $sessionStorage.cartIDCount[item.id].count = $sessionStorage.cartIDCount[item.id].count - 1
      }
      this.countCartItems();
    }

    this.increment = function(item) {
      $sessionStorage.cartIDCount[item.id].count = $sessionStorage.cartIDCount[item.id].count + 1
      this.countCartItems();
    }

    this.incrementByX = function(item, x) {
      $sessionStorage.cartIDCount[item.id].count = $sessionStorage.cartIDCount[item.id].count + x;
      this.countCartItems();
    }

    this.checkOrderAvailability = function(){
       $sessionStorage.beerLoaderMessage="Checking Your Order";
      $sessionStorage.beerLoader=true;
      //send a call to the server to check if the order is available
      var formattedList = [];
      for(var i in $sessionStorage.cartIDCount) {
        formattedList.push({
          id: parseInt(i),
          count: $sessionStorage.cartIDCount[i].count
        })
      }

      var data = {
          order_items: formattedList,
          region: $sessionStorage.currentRegionID,
        };

      $http.post(API_BASE + 'orders/check_availability/', data).success(function(d){
        $log.info('DATA FROM ORDER CHECKING', d);
        countCartItems();
        $sessionStorage.beerLoader=false;
        $sessionStorage.orderVerified = true;
        $location.path('/checkoutpayment');

      }).error(function(e){
        $sessionStorage.beerLoader=false;
        $sessionStorage.orderVerified = false;
        $log.error('ERROR FROM ORDER CHECKING', e);
        $log.debug(e.item_shortages);
        // loop through the sessionStorage cartIdAccount and return the remaining and set and error flag
        angular.forEach(e.item_shortages, function (val,key) {
          $log.debug('val, key item shortage', val,key)

            $sessionStorage.cartIDCount[val.item_id.toString()].error = true;
          $sessionStorage.cartIDCount[val.item_id.toString()].requested = val.amount_requested;
          $sessionStorage.cartIDCount[val.item_id.toString()].remaining = val.in_stock;
          $sessionStorage.cartIDCount[val.item_id.toString()].count = val.in_stock;


          angular.forEach($sessionStorage.cartIDCount, function(val, key){
            $log.debug('cartcoutn loop',val,key)
            if(val.count <= val.remaining){
              //val.error = false;
            }
            countCartItems();

          })

        });
        $log.debug('SESSION STORAGE AFTER CART CHECKKING', $sessionStorage)
      });
      //return a list of item errors if it is not available
      //redirect them to payment if it's all chill
    }



    this.processOrder = function(couponCode) {
      // hack to get 'this' into promise as 'self'
      var self = this;
      usSpinnerService.spin('spinner-1');

      var formattedList = [];
      for(var i in $sessionStorage.cartIDCount) {
        formattedList.push({
          id: parseInt(i),
          count: $sessionStorage.cartIDCount[i].count,


        })
      }

      return new Promise(function(resolve, reject) {
        var completeOrderObject = {
          order_items: formattedList,
          total: self.calculateTotal(),
          region: $sessionStorage.currentRegionID,
          latitude: $sessionStorage.latitude,
          longitude: $sessionStorage.longitude,
          address_string: $sessionStorage.currentFormattedAddress
        }
        if ($sessionStorage.couponCode != null){
          completeOrderObject.couponCode = $sessionStorage.couponCode
        }

        $http.post(API_BASE + 'orders/', completeOrderObject)
        .success(function(res) {
          usSpinnerService.stop('spinner-1');
          // clear out the cart upon success
          $sessionStorage.cartIDCount = {};
          countCartItems();
          initializeCartCounter();
          resolve(res)
        })

        .error(function(err) {
          usSpinnerService.stop('spinner-1');
          reject(err)
        })

      })
    }

    /* ORDER CANCELATION STUFF */
    function openCancelationModal (orderId) {
    var modalInstance = $uibModal.open({
     templateUrl: 'views/ordercancellationmodal.html',
      controller: 'OrdercancellationmodalCtrl',
      resolve: {
            order: function () {
          return orderId;
        }
      }
    });

    modalInstance.result.then(function () {
      $log.debug('modal has been closed with ok');
      userService.fetchUserOrders().success(function(d){
      $log.debug('USER ORDERS', d);
      $sessionStorage.userOrders = d;
    }).error(function(e){

    });

    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());

    });
  };

    this.cancelOrder = function(orderId){
      openCancelationModal(orderId);
    };

    this.cancelOrderApiCall = function(orderId){
      var data = {
        order_id: orderId
      }
      return $http.post(API_BASE + 'orders/cancel/', data);

    }


  });
