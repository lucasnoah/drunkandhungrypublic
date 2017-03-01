'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
// removed providers: customerService, stripe, $uibModal
  .controller('PaymentCtrl', function ($scope,
                                       $auth,
                                       $http,
                                       API_BASE,
                                       $location,
                                       usSpinnerService,
                                       formlyValidationMessages,
                                       userService,
                                       stripe,
                                       $sessionStorage,
                                       errormodal) {

    /*  INITIALIIZE SCOPE VARS FOR FORM MODELS */
    $scope.userData = {};
    $scope.userData = {};
    $scope.ccData = {};
    $scope.addressData = {};
    console.log('session', $sessionStorage)

    // check that user data and card data exist, then decide to show or hide form
    var customer = $sessionStorage.customerData
    if (customer.first_name === '' || customer.last_name === '' || customer.phone_number === '') {
      // display user edit in first edit mode
      $scope.userEditVisible = true;
      // and hide cancel button! this time
      $sessionStorage.displayUserEditCancel = false
    } else {
      // standard display
      $scope.userEditVisible = false
      $sessionStorage.displayUserEditCancel = true
    }

    if (customer.default_stripe_data === '') {
      // display card edit in first edit mode
      $scope.cardEditVisible = true
      // and hide cancel button this time
      $sessionStorage.displayCardEditCancel = false
    } else {
      // standard display
      $scope.cardEditVisible = false;
      $sessionStorage.displayCardEditCancel = true
    }

    if($sessionStorage.addressConfirmed){
      $scope.addressConfirmed=true;
    }
    else{
      $scope.addressConfirmed = false;
    }

    $scope.sessionStorage = $sessionStorage;
    $scope.sessionStorage.beerGuyMessage = 'We need a bit more info to complete your order';

    $scope.editUser = function () {
      $scope.userEditVisible = true
    }
    $scope.editCard = function () {
      $scope.cardEditVisible = true
    }

    /* SUBMIT FUNCTION FOR STEP 1 USER */
    $scope.updateUser = function () {
      if ($scope.userForm.$valid) {
        usSpinnerService.spin('spinner-1');
        var customerDetails = $scope.userData;
        userService.updateUserDetails(customerDetails)
          .then(function (res) {
            console.log('SUCCESS, load to customer data: ', res)
            $sessionStorage.customerData = res
            $scope.userEditVisible = false
            $scope.$apply()
            usSpinnerService.stop('spinner-1');
          })
          .catch(function (err) {
            console.log('ERROR: ', err)
            usSpinnerService.stop('spinner-1');
          })
      }
    }

    /* CUSTOMER DETAILS FORM */
    $scope.userFields = [
      {
        fieldGroup: [
          {
            type: 'input',
            key: 'first_name',
            templateOptions: {
              label: 'First Name',
              required: true,
              placeholder: 'first name'
            }
          },
          {
            type: 'input',
            key: 'last_name',
            templateOptions: {
              label: 'Last Name',
              required: true,
              placeholder: 'last name'

            }

          }
        ]
      },
      {
        key: 'phone_number',
        type: 'maskedInput',
        templateOptions: {

          label: 'Phone Number',
          required: true,
          mask: '(999) 999-9999'
        },
        validators: {
          phone_number: is.nanpPhone
        }
      },
    ];

    /* CREDIT CARD FORM */
    $scope.ccFields = [
      {
        key: 'ccType',
        type: 'select',
        templateOptions: {
          required: true,
          label: 'Credit Card Type',
          options: [
            {name: 'Visa', value: 'Visa'},
            {name: 'American Express', value: 'American Express'},
            {name: 'MasterCard', value: 'MasterCard'},
          ]
        }
      },
      {
        key: 'ccNumber',
        type: 'maskedInput',
        templateOptions: {
          required: true,
          label: 'Credit Card',
          mask: '9999 9999 9999 9999'
        },
        expressionProperties: {
          'templateOptions.ccType': 'ccData.ccType',
          'templateOptions.placeholder': '"Enter a valid " + to.ccType + " card number"'
        }
      },

      {
        key: 'cvc',
        type: 'cvc',
        templateOptions: {
          required: true,
          label: 'CVC'
        },
        expressionProperties: {
          'templateOptions.ccType': 'ccData.ccType',
          'templateOptions.placeholder': '"Enter a valid " + to.cvc + " CVC code"'
        }
      },
      {
        key: 'month',
        type: 'select',
        defaultValue: '01',
        templateOptions: {
          label: 'Exp Month',
          required: true,
          options: [
            {name: '01', value: '01'},
            {name: '02', value: '02'},
            {name: '03', value: '03'},
            {name: '04', value: '04'},
            {name: '05', value: '05'},
            {name: '06', value: '06'},
            {name: '07', value: '07'},
            {name: '08', value: '08'},
            {name: '09', value: '09'},
            {name: '10', value: '10'},
            {name: '11', value: '11'},
            {name: '12', value: '12'}
          ],
        }
      },
      {
        key: 'year',
        type: 'select',
        defaultValue: '16',
        templateOptions: {
          label: 'Exp Year',
          required: true,
          options: [
            {name: '2016', value: '16'},
            {name: '2017', value: '17'},
            {name: '2018', value: '18'},
            {name: '2019', value: '19'},
            {name: '2020', value: '20'},
            {name: '2021', value: '21'},
            {name: '2022', value: '22'},
            {name: '2023', value: '23'},
            {name: '2024', value: '24'},
            {name: '2025', value: '25'},
            {name: '2026', value: '26'},
            {name: '2027', value: '27'}
          ]
        }
      }
      /*
       {
       key: 'month',
       type: 'month',
       templateOptions: {
       required: true,
       label: 'Exp Month'
       },
       expressionProperties: {
       'templateOptions.placeholder': '"01"'
       }
       },
       {
       key: 'year',
       type: 'year',
       templateOptions: {
       required: true,
       label: 'Exp Year'
       },
       expressionProperties: {
       'templateOptions.placeholder': '"17"'
       }
       }
       */
    ];


    // ADDRESS CONFIRMATION STUFF
     $scope.addressFields = [
      {
        key: 'location',
        type: 'placeAutoComplete',
        templateOptions: {
          label: 'Enter your address',
          focus:true,

          placeholder: 'Enter your address',
          autocompleteOptions: {
            types: ['establishment', 'geocode'],
            forceSelection:true,
            required:true,

          }
        }
      },

       {
         key: 'line2',
         type: 'input',
         templateOptions:{
           label: 'Apt No',
           type: 'text'
         }
       }
    ];

    $scope.toggleAddressEdit = function(){
      if($scope.addressConfirmed){
        $scope.addressConfirmed = false;
      }
      else{
        $scope.addressConfirmed = true;
      }
    }

    $scope.setNewAddress = function () {
      console.log("new address DATA", $scope.addressData.location);
      $sessionStorage.currentFormattedAddress = $scope.addressData.location.formatted_address;
      $sessionStorage.latitude = $scope.addressData.location.geometry.location.lat();
      $sessionStorage.longitude = $scope.addressData.location.geometry.location.lng();
      $sessionStorage.currentSecondaryAddress = $scope.addressData.line2;
      $sessionStorage.addressConfirmed = true;
      $scope.addressConfirmed = true;
      console.log("confirm your address",$sessionStorage)
    }

    //END ADDRESS CONFIRMATION STUFF


    /* FUNCTION TO CHARGE CREDIT CARD */
    $scope.updatePayment = function () {
      var paymentData = {
        number: $scope.ccData.ccNumber,
        cvc: $scope.ccData.cvc,
        exp_month: $scope.ccData.month,
        exp_year: $scope.ccData.year
      }

      usSpinnerService.spin('spinner-1');

      return stripe.card.createToken(paymentData)
        .then(function (token) {
          return userService.sendToken(token)
        })
        .then(function (res) {
          usSpinnerService.stop('spinner-1');
          $sessionStorage.customerData = res
          $scope.cardEditVisible = false
        })
        .catch(function (err) {
          usSpinnerService.stop('spinner-1');
          errormodal.raiseErrorModal(err);
        });
    };

    $scope.cancelUserEdit = function () {
      $scope.userEditVisible = false
    }

    $scope.cancelCardEdit = function () {
      $scope.cardEditVisible = false
    }


  });
