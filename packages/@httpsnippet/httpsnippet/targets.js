'use strict'

const clients = require('./clients')

module.exports = (function () {
  const baseTargets = {
    shell: { key: 'shell', title: 'Shell', extname: '.sh', default: 'curl' },
    node: { key: 'node', title: 'Node.js', extname: '.js', default: 'native' },
    javascript: {
      key: 'javascript',
      title: 'JavaScript',
      extname: '.js',
      default: 'xhr'
    },
    ocaml: { key: 'ocaml', title: 'OCaml', extname: '.ml', default: 'cohttp' },
    php: { key: 'php', title: 'PHP', extname: '.php', default: 'curl' },
    python: {
      key: 'python',
      title: 'Python',
      extname: '.py',
      default: 'python3'
    },
    objc: {
      key: 'objc',
      title: 'Objective-C',
      extname: '.m',
      default: 'nsurlsession'
    },
    swift: {
      key: 'swift',
      title: 'Swift',
      extname: '.swift',
      default: 'nsurlsession'
    },
    go: { key: 'go', title: 'Go', extname: '.go', default: 'native' },
    java: { key: 'java', title: 'Java', extname: '.java', default: 'unirest' },
    ruby: { key: 'ruby', title: 'Ruby', extname: '.rb', default: 'native' },
    csharp: {
      key: 'csharp',
      title: 'C#',
      extname: '.cs',
      default: 'restsharp'
    },
    clojure: {
      key: 'clojure',
      title: 'Clojure',
      extname: '.clj',
      default: 'clj_http'
    },
    c: { key: 'c', title: 'C', extname: '.c', default: 'libcurl' }
  }

  return {
    all,
    clients,
    available,
    match
  }

  function all () {
    const targets = Object.keys(clients).reduce((acc, client) => {
      const info = clients[client] && clients[client].info

      if (acc[info.target] && acc[info.target].clients) {
        acc[info.target].clients[client] = clients[client]
      } else {
        acc[info.target] = {
          ...baseTargets[info.target],
          clients: {
            [client]: clients[client]
          }
        }
      }

      return acc
    }, {})

    return Object.keys(targets).map(target => {
      return {
        ...targets[target],
        clients: targets[target].clients
      }
    })
  }

  function available () {
    return all().map(target => {
      return {
        ...target,
        clients: Object.keys(target.clients).map(client => {
          const returned = {
            ...clients[client].info
          }
          delete returned.target
          return returned
        })
      }
    })
  }

  function match (target, client) {
    const foundTarget = all().find(t => t.key === target)

    if (!foundTarget) {
      return false
    }

    if (typeof client === 'string' && typeof clients[client] === 'function') {
      return clients[client]
    }

    return clients[foundTarget.default]
  }
})()
