'use strict';

describe('Filter: hascount', function () {

  // load the filter's module
  beforeEach(module('drunkandhungryApp'));

  // initialize a new instance of the filter before each test
  var hascount;
  beforeEach(inject(function ($filter) {
    hascount = $filter('hascount');
  }));

  it('should return the input prefixed with "hascount filter:"', function () {
    var text = 'angularjs';
    expect(hascount(text)).toBe('hascount filter: ' + text);
  });

});
