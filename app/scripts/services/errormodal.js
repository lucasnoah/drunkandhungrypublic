'use strict';

/**
 * @ngdoc service
 * @name drunkandhungryApp.errormodal
 * @description
 * # errormodal
 * Service in the drunkandhungryApp.
 */
angular.module('drunkandhungryApp')
  .service('errormodal', function ($uibModal, $log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
      /* CREDIT CARD ERROR MESSAGE MODAL  */
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
    
    this.raiseErrorModal = function (msg) {
      return openComponentModal(msg);
    }
    
  });
