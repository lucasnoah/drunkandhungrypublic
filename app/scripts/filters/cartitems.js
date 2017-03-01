'use strict';

/**
 * @ngdoc filter
 * @name drunkandhungryApp.filter:cartitems
 * @function
 * @description
 * # cartitems
 * Filter in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .filter('cartitems', function () {
    // filter out items from the cart that don't have anything in the purchase
    return function (items, cartCountMapping) {
      var out = [];
      angular.forEach(items, function(val,key){
        if (cartCountMapping[val.id].count > 0) {
          out.push(val)
      }
      });
      return out
    };
  });
