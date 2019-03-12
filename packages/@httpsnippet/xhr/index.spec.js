/* global describe, it */

'use strict'

var fixtures = require('../httpsnippet/fixtures')
var HTTPSnippet = require('../httpsnippet')
require('should')

describe('httpsnippet - target - javascript - xhr', function () {
  it('should not use cors', function () {
    var result = new HTTPSnippet(fixtures.requests.short).convert('javascript', 'xhr', {
      cors: false
    })

    result.should.be.a.String()
    result.replace(/\n/g, '').should.eql('var data = null;var xhr = new XMLHttpRequest();xhr.addEventListener("readystatechange", function () {  if (this.readyState === this.DONE) {    console.log(this.responseText);  }});xhr.open("GET", "http://mockbin.com/har");xhr.send(data);')
  })
})
