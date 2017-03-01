'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:couponEntry
 * @description
 * # couponEntry
 */
angular.module('drunkandhungryApp')
  .controller('couponEntryCtrl', function ($scope, $sessionStorage, utilityService, userService) {
    $scope.couponForm = {};
    $scope.storage = $sessionStorage;
    //create form fields
    $scope.couponEntryFields  = [
      {
        key: 'couponCode',
        type:'input-loader',
        templateOptions: {
          onKeydown: function(value, options) {
            options.validation.show = false;
          },
          onBlur: function(value, options) {
            options.validation.show = null;
          }
        },
        asyncValidators: {
          uniqueUsername: {

            expression: function($viewValue, $modelValue, scope) {
              scope.options.templateOptions.loading = true;
              var code = $modelValue
              if ($modelValue !== undefined){
                code = $modelValue.toUpperCase()
              }
              var data = {
                couponCode: code,
                total: utilityService.calculateTotal()
              }
              return userService.checkCoupon(data).then(function(d) {
                  if (d.status == 200) {
                    console.log('success data', d.data)
                    scope.options.templateOptions.loading = false;
                    $scope.couponMessage = d.data.msg;
                    $scope.couponDiscount = d.data.discount;
                    $scope.storage.couponCode = d.data.couponCode;
                  }
                  else {
                    scope.options.templateOptions.loading = false;
                    $scope.couponMessage = d.data.msg;
                    $scope.couponDiscount = d.data.discount;
                    $scope.storage.couponCode = null;
                  }
                }
              )
            },
            message: 'Not a valid coupon code.'
          }
        },
        modelOptions: {
          updateOn: 'default blur keydown',
          debounce: {
            keydown: 500,
            default: 500,
            blur: 500
          }
        }

      }
    ]
    //create async validator
    //create current display message

  })
  .directive('couponEntry', function () {
    return {
      templateUrl: 'views/couponEntryDirective.html',
      restrict: 'E',
      controller: 'couponEntryCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
