'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:testme
 * @description
 * # testme
 */
angular.module('drunkandhungryApp')
  .directive('google', function () {

    // var linkFunction = function(scope, element, attributes) {
    //   scope.autohide = attributes["autohide"];
    // };

    return {
      templateUrl: 'views/googleautocomplete.html',
      restrict: 'E',
      controller: 'googleautocompleteCtrl'
    };
  });
