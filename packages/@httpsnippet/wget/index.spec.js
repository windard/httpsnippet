/* global it describe */

'use strict'

var fixtures = require('../httpsnippet/fixtures')
var HTTPSnippet = require('../httpsnippet')
require('should')

describe('httpsnippet - target - shell - wget', function () {
  it('should use short options', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      short: true,
      indent: false
    })

    result.should.be.a.String()
    result.should.eql("wget -q --method POST --header 'cookie: foo=bar; bar=baz' --header 'content-type: application/x-www-form-urlencoded' --header 'accept: application/json' --body-data foo=bar -O - 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value'")
  })

  it('should ask for -v output', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: true,
      indent: false,
      verbose: true
    })

    result.should.be.a.String()
    result.should.eql('wget -v --method GET -O - http://mockbin.com/har')
  })

  it('should ask for --verbose output', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('shell', 'wget', {
      short: false,
      indent: false,
      verbose: true
    })

    result.should.be.a.String()
    result.should.eql('wget --verbose --method GET --output-document - http://mockbin.com/har')
  })

  it('should use custom indentation', function () {
    var result = new HTTPSnippet(fixtures.requests.full).convert('shell', 'wget', {
      indent: '@'
    })

    result.should.be.a.String()
    result.replace(/\\\n/g, '').should.eql("wget --quiet @--method POST @--header 'cookie: foo=bar; bar=baz' @--header 'content-type: application/x-www-form-urlencoded' @--header 'accept: application/json' @--body-data foo=bar @--output-document @- 'http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value'")
  })
})
