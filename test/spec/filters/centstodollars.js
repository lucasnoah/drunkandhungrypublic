'use strict';

describe('Filter: centsToDollars', function () {

  // load the filter's module
  beforeEach(module('drunkandhungryApp'));

  // initialize a new instance of the filter before each test
  var centsToDollars;
  beforeEach(inject(function ($filter) {
    centsToDollars = $filter('centsToDollars');
  }));

  it('should return the input prefixed with "centsToDollars filter:"', function () {
    var text = 'angularjs';
    expect(centsToDollars(text)).toBe('centsToDollars filter: ' + text);
  });

});
