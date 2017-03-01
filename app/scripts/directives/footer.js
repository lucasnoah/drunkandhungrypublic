'use strict';

/**
 * @ngdoc directive
 * @name drunkandhungryApp.directive:footer
 * @description
 * # footer
 */
angular.module('drunkandhungryApp')
  .directive('footer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the footer directive');
      }
    };
  });
