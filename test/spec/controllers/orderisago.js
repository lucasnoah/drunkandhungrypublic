'use strict';

describe('Controller: OrderisagoCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var OrderisagoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderisagoCtrl = $controller('OrderisagoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrderisagoCtrl.awesomeThings.length).toBe(3);
  });
});
