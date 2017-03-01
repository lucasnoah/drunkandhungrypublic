'use strict';

describe('Service: incrementItem', function () {

  // load the service's module
  beforeEach(module('drunkandhungryApp'));

  // instantiate service
  var incrementItem;
  beforeEach(inject(function (_incrementItem_) {
    incrementItem = _incrementItem_;
  }));

  it('should do something', function () {
    expect(!!incrementItem).toBe(true);
  });

});
