'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('SignupDirectiveCtrl', function ($scope, userService, $sessionStorage, usSpinnerService, $auth, $http, API_BASE, $window, utilityService, $location) {

    /*SET UP FORM FIELDS AND DATA STORE*/
    $scope.storage = $sessionStorage;
    $scope.storage.beerGuyMessage="I would love to get to know you buddy!";
    $scope.userData = {}

    //FACEBOOK AUTH
    $scope.loginWithFacebook = function () {
      $scope.storage.beerLoader = true;
      $auth.authenticate('facebook', {provider:'facebook'}).then(function(res){
        return utilityService.loginSetup()
      })
        .then(function(res) {
          $sessionStorage.customerData = res;
          userService.fetchUserOrders().success(function(d){
            $sessionStorage.userOrders = d;
          })
          $scope.beerLoader = false;
          console.log('show order ver', $scope.storage.orderVerified)
          if ($scope.storage.orderVerified){
            $location.path('/checkoutpayment')
          }
          else if ($scope.storage.canShop){
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

    $scope.userFields = [
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
        },
        asyncValidators: {
          isUniqueUser: function($viewValue, $modelValue, $scope){
            var value = $viewValue || $modelValue;
            return $http.post(API_BASE + 'customers/check_user/', {username:value}).success(function(d){
              return 'Unique'
            }).error(function(msg){
              throw new Error('not Unique')
            })
          }

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
      },
      {
        //className: 'col-xs-12',
        key: 'confirm_password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Confirm Password',
          required: true
        }
      }
    ];

    /*SET UP SIGNUP METHOD*/
     function onSubmitUser() {

      if ($scope.userForm.$valid) {
        $scope.beerLoader = true;
       $scope.beerLoaderMessage ='signing you up';

        var userData = {
          username: $scope.userData.email,
          email: $scope.userData.email,
          password: $scope.userData.password
        }
        // TODO: refactor this into a promis in userServices
        userService.register(userData)
        .then(function(res) {
          var user = {
            username: userData.email,
            password: userData.password
          }
          return $auth.login(user)
        })
        .then(function (response) {
          // init on login
          return utilityService.loginSetup()
          // return userService.getCustomerData()
        })
        .then(function(res) {
          // Redirect user here after a successful log in.
          $scope.beerLoader = false;
          console.log('show order ver', $scope.storage.orderVerified)
          if ($scope.storage.orderVerified){
            $location.path('/checkoutpayment')
          }
          else{
            $location.path('/cart')
          }

        })
        .catch(function (err) {
          $scope.beerLoader = false;
        });
      }
    }

    $scope.signUp = onSubmitUser;



  });
