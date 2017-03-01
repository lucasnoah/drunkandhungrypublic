'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:OrdercancellationmodalCtrl
 * @description
 * # OrdercancellationmodalCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('OrdercancellationmodalCtrl', function ($scope, $uibModalInstance, order, utilityService) {
        $scope.ok = function () {
          utilityService.cancelOrderApiCall(order).success(function(){
            console.log('order is canceled');
            $uibModalInstance.close();
          }).error(function(){
            
          })
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  });
