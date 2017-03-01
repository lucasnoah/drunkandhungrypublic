'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('LoginDirectiveCtrl', function ($scope, usSpinnerService, $auth, is, $location, $window, userService, $sessionStorage, utilityService, $http, API_BASE) {
    /*SET UP FORM FIELDS AND DATA STORE*/
    $scope.loginForm = {}
    $scope.loginData = {}
    $scope.storage = $sessionStorage
    $scope.storage.beerGuyMessage = "Nice to see you again buddy!";


    //FACEBOOK AUTH
    $scope.loginWithFacebook = function () {
      $scope.beerLoader = true;
      $auth.authenticate('facebook', {provider:'facebook'}).then(function(res){
        return utilityService.loginSetup()
      })
        .then(function(res) {
          $sessionStorage.customerData = res;
          userService.fetchUserOrders().success(function(d){
            $sessionStorage.userOrders = d;
          })
          $scope.beerLoader = false;
          if ($scope.storage.orderVerified){
            $location.path('/checkoutpayment')
          }
          if ($scope.storage.canShop){
            $location.path('/shop')
          }
          else{
            $location.path('/')
          }
        })
        .catch(function (response) {
          $scope.beerLoader = false;
          $scope.errorMessage = 'Those credentials were incorrect. Please sign up or try again';
          // Handle errors here, such as displaying a notification
          // for invalid email and/or password.
        });
    }



    $scope.loginFields = [
      {
        // className: 'col-xs-12',
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'Email',
          required: true
        },
        validators: {
          email: is.email
        }
      },
      {
        //className: 'col-xs-12',
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Password',
          required: true
        }
      }
    ];

    /*SET UP SIGNUP METHOD*/
     function onSubmitUser() {
      if ($scope.loginForm.$valid) {
        $scope.beerLoaderMessage = "Logging you in";
        $scope.beerLoader=true;
        var data = {
          username:$scope.loginData.email,
          password:$scope.loginData.password
        }
        $auth.login(data)
        .then(function(res) {
          return utilityService.loginSetup()
        })
        .then(function(res) {
          $sessionStorage.customerData = res;
          userService.fetchUserOrders().success(function(d){
            $sessionStorage.userOrders = d;
          })
          $scope.beerLoader = false;
          if ($scope.storage.orderVerified){
            $location.path('/checkoutpayment')
          }
          if ($scope.storage.canShop){
           $location.path('/shop')
          }
          else{
            $location.path('/')
          }
        })
        .catch(function (response) {
          $scope.beerLoader = false;
          $scope.errorMessage = 'Those credentials were incorrect. Please sign up or try again';
          // Handle errors here, such as displaying a notification
          // for invalid email and/or password.
        });
      }
    }

    $scope.login = onSubmitUser;

  });
