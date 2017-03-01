'use strict';

describe('Controller: CheckoutpaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var CheckoutpaymentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckoutpaymentCtrl = $controller('CheckoutpaymentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CheckoutpaymentCtrl.awesomeThings.length).toBe(3);
  });
});
