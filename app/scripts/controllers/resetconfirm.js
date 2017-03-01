'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:ResetconfirmCtrl
 * @description
 * # ResetconfirmCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('ResetconfirmCtrl', function ($scope, $routeParams, userService) {

    $scope.confirmData = {};
    $scope.uid = $routeParams.uid;
    $scope.token = $routeParams.token;
    $scope.confirmed = false;
    $scope.confirmError = false;


    $scope.confirmPasswordFields = [
      {
        // className: 'col-xs-12',
        key: 'new_password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'New Password',
          required: true
        }
      },
      {
        // className: 'col-xs-12',
        key: 're_new_password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          required: true
        }
      }
    ];

    $scope.confirmPassword = function(){
      console.log('form', $scope.confirmPasswordForm);
      if ($scope.confirmPasswordForm.$valid){
        var data = {
          uid: $scope.uid,
          token: $scope.token,
          new_password: $scope.confirmData.new_password,
          re_new_password: $scope.confirmData.re_new_password
        };

        userService.confirmPasswordReset(data).success(function(){
          alert('Your password has been successfully reset. You will now be rerouted to the login page.');
          $location.path('/login')
        }).error(function(data){
          $scope.errorMessage = data;
        })
      }
      else{

      }
    }
  });
