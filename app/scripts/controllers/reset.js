'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:ResetCtrl
 * @description
 * # ResetCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('ResetCtrl', function ($scope, userService, $log, usSpinnerService) {
    $scope.resetData = [];
    $scope.resetSuccess = false;
    $scope.resetFail = false;
    $scope.resetFields = [
      {
        // className: 'col-xs-12',
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email',
        },
        validators: {
          email: is.email
        }
      }
    ];

    $scope.resetPassword = function (){
      usSpinnerService.spin('spinner-1')
      userService.sendPasswordResetEmail($scope.resetData.email).success(function(d){
        usSpinnerService.stop('spinner-1');
        $log.debug(
          'email sent'
        );
        $scope.resetFail = false;
        $scope.resetSuccess = true;
      }).error(function (err) {
        usSpinnerService.stop('spinner-1');
        console.log('FAIL' +
          err)
        $scope.resetFail = true;
      })


    }

  });
