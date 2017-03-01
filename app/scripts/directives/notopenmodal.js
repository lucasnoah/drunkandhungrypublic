'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:notOpenModal
 * @description
 * # notOpenModal
 */
angular.module('drunkandhungryApp')
  .controller('notOpenModalCtrl', function($scope, $sessionStorage, OPEN_HOURS){
    $scope.storage = $sessionStorage;
    $scope.region = $scope.storage.region;
    $scope.openHours = openHours;

  })
  .directive('notOpenModal', function () {
    return {
      templateUrl: 'views/notOpenModal.html',
      restrict: 'E',
      controller: 'notOpenModalCtrl',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
