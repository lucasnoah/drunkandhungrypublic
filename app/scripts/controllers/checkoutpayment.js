'use strict';

/**
 * @ngdoc function
 * @name drunkandhungryApp.controller:CheckoutpaymentCtrl
 * @description
 * # CheckoutpaymentCtrl
 * Controller of the drunkandhungryApp
 */
angular.module('drunkandhungryApp')
  .controller('CheckoutpaymentCtrl', function ($scope, utilityService, $sessionStorage,
                                               $location, $window, errormodal, $uibModal, $log) {

    $scope.storage = $sessionStorage;
    $scope.storage.beerGuyMessage = 'Almost there!';
    $scope.displayCustomerDataError = false;


    $scope.calculateTotal = function () {
      return utilityService.calculateTotal()
    };

    $scope.calculateDiscountTotal = function(){
      return utilityService.calculateCartTotal()
    }

    function setErrorFocus() {
      var element = $window.document.getElementById("userErrorData");
      element.focus();
    };

    $scope.processOrder = function () {
      $scope.beerLoaderMessage="Ordering your stuff";
      $scope.beerLoader=true;
      if ($scope.storage.customerData.first_name === '' || $scope.storage.customerData.last_name === '' || $scope.storage.customerData.phone_number === '') {
        $scope.displayCustomerDataError = true;
        $scope.customerDataError = 'Please fill in your customer information so that we can notify you when your order arrives!';
        $scope.beerLoader=false;

        return setErrorFocus();
      }
      if (!$scope.storage.addressConfirmed) {
        $scope.displayCustomerDataError = true;
        $scope.customerDataError = 'Please confirm your address.';
        $scope.beerLoader=false;

        return setErrorFocus();
      }
      if ($scope.storage.customerData.default_stripe_data == "") {
        $scope.displayCustomerDataError = true;
        $scope.customerDataError = 'Please add a valid payment method.';
        $scope.beerLoader=false;
        return setErrorFocus();
      }

      console.log(' ------- Process order!', utilityService);
      $scope.storage.beerLoaderMessage="Ordering your stuff";
      $scope.storage.beerLoader=true;
      utilityService.processOrder()
        .then(function (res) {
          $scope.beerLoader=false;
          $location.path('/orderisago');
          $scope.$apply();
        })
        .catch(function (err) {
          $scope.beerLoader=false;
         errormodal.raiseErrorModal(err.msg);
        })
    }


  /* CREDIT CARD ERROR MESSAGE MODAL
    function openComponentModal (errorMessage) {
    var modalInstance = $uibModal.open({
     templateUrl: 'views/errormodal.html',
      controller: 'ErrormodalCtrl',
      resolve: {
            msg: function () {
          return errorMessage;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {

    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };
  */
  });
