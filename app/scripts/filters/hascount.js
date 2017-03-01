'use strict';

/**
 * @ngdoc filter
 * @name drunkandhungryApp.filter:hascount
 * @function
 * @description
 * # hascount
 * Filter in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .filter('hascount', function ($log) {
    return function (items) {
      var output = [];
      angular.forEach(items, function(val){
        if (val.count > 0){
          output.push(val)
        }

      });
      return output
    };

  });
