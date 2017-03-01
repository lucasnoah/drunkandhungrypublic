'use strict';

describe('Filter: cartitems', function () {

  // load the filter's module
  beforeEach(module('drunkandhungryApp'));

  // initialize a new instance of the filter before each test
  var cartitems;
  beforeEach(inject(function ($filter) {
    cartitems = $filter('cartitems');
  }));

  it('should return the input prefixed with "cartitems filter:"', function () {
    var text = 'angularjs';
    expect(cartitems(text)).toBe('cartitems filter: ' + text);
  });

});
