/**
 * @description
 * Asynchronous Http and WebSocket Client library for Java
 * 
 * @author
 * @windard
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = Object.assign({
    indent: '  '
  }, options)

  var code = new CodeBuilder(opts.indent)

  var methods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT' ]

  code.push('Dsl.asyncHttpClient()')

  code.push(1, '.prepare%s%s("%s")', source.method.slice(0,1).toUpperCase(), source.method.slice(1).toLowerCase(), source.fullUrl)

  // Add headers, including the cookies
  var headers = Object.keys(source.allHeaders)

  // construct headers
  if (headers.length) {
    headers.forEach(function (key) {
      code.push(1, '.setHeader("%s", "%s")', key, source.allHeaders[key])
    })
  }

  if (source.postData.text) {
    code.push(1, '.setBody(%s)', JSON.stringify(source.postData.text))
  }

  code.push(1, '.execute()')
  code.push(1, '.toCompletableFuture()')
  code.push(1, '.thenAccept(System.out::println)')
  code.push(1, '.join();')

  return code.join()
}

module.exports.info = {
  key: 'asynchttp',
  title: 'AsyncHttp',
  link: 'https://github.com/AsyncHttpClient/async-http-client',
  description: 'Asynchronous Http and WebSocket Client library for Java'
}
