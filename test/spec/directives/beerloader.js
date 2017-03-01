'use strict';

describe('Directive: beerLoader', function () {

  // load the directive's module
  beforeEach(module('drunkandhungryApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<beer-loader></beer-loader>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the beerLoader directive');
  }));
});
