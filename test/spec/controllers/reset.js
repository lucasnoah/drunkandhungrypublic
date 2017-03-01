'use strict';

describe('Controller: ResetCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var ResetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResetCtrl = $controller('ResetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResetCtrl.awesomeThings.length).toBe(3);
  });
});
