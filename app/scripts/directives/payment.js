'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:payment
 * @description
 * # payment
 */
angular.module('drunkandhungryApp')
  .directive('payment', function () {
    return {
      templateUrl: 'views/payment.html',
      restrict: 'E',
      controller: 'PaymentCtrl'
    };
  });
