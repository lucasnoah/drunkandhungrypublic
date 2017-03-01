'use strict';

describe('Directive: productCarousel', function () {

  // load the directive's module
  beforeEach(module('drunkandhungryApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-carousel></product-carousel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the productCarousel directive');
  }));
});
