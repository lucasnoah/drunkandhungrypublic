'use strict';

describe('Directive: payment', function () {

  // load the directive's module
  beforeEach(module('drunkandhungryApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<payment></payment>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the payment directive');
  }));
});
