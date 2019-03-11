'use strict'

var fixtures = require('../fixtures')
var HTTPSnippet = require('../httpsnippet')
require('should')

describe('httpsnippet - target - javascript - jquery', function () {
  it('should not use cors', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('javascript', 'jquery')

    result.should.be.a.String()
  })
})
