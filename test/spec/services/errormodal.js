'use strict';

describe('Service: errormodal', function () {

  // load the service's module
  beforeEach(module('drunkandhungryApp'));

  // instantiate service
  var errormodal;
  beforeEach(inject(function (_errormodal_) {
    errormodal = _errormodal_;
  }));

  it('should do something', function () {
    expect(!!errormodal).toBe(true);
  });

});
