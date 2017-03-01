'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:ErrormodalCtrl
 * @description
 * # ErrormodalCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('ErrormodalCtrl', function ($scope, $uibModalInstance, msg) {

    $scope.msg=msg;

    $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  });
