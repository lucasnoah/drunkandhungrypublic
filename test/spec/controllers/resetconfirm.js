'use strict';

describe('Controller: ResetconfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var ResetconfirmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResetconfirmCtrl = $controller('ResetconfirmCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ResetconfirmCtrl.awesomeThings.length).toBe(3);
  });
});
