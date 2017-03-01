'use strict';

describe('Controller: SignupctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('drunkandhungryApp'));

  var SignupctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupctrlCtrl = $controller('SignupctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SignupctrlCtrl.awesomeThings.length).toBe(3);
  });
});
