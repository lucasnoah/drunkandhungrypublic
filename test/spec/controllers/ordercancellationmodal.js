'use strict';

describe('Controller: OrdercancellationmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var OrdercancellationmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrdercancellationmodalCtrl = $controller('OrdercancellationmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(OrdercancellationmodalCtrl.awesomeThings.length).toBe(3);
  });
});
