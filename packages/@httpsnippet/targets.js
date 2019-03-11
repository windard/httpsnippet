'use strict'

module.exports = {
  shell: {
    info: {
      key: 'shell',
      title: 'Shell',
      extname: '.sh',
      default: 'curl'
    },

    curl: require('./curl')
  },
  javascript: {
    info: {
      key: 'javascript',
      title: 'JavaScript',
      extname: '.js',
      default: 'xhr'
    },
    xhr: require('./xhr'),
    jquery: require('./jquery')
  }
}
