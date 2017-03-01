'use strict';

describe('Controller: SidecartCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var SidecartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SidecartCtrl = $controller('SidecartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SidecartCtrl.awesomeThings.length).toBe(3);
  });
});
