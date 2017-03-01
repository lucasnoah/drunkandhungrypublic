'use strict';

/**
 * @ngdoc filter
 * @name drunkandhungryApp.filter:centsToDollars
 * @function
 * @description
 * # centsToDollars
 * Filter in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .filter('centsToDollars', function () {
    return function (input) {
      return input / 100;
    };
  });
