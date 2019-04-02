'use strict'

const clients = require('./clients')

/**
 * @typedef {Object} ClientInfo
 * @prop {string} key - e.g. "curl"
 * @prop {string} title - e.g. "cURL"
 * @prop {string} link - href linking to client website.
 * @prop {string} description
 * @prop {string} target - {Target}.key
 */

/**
 * @typedef {Object} Client
 * @prop {Function} - code building function
 * @prop {ClientInfo} info - info about client
 */

/**
 * @typedef {Object} Target
 * @prop {string} key - e.g. "javascript"
 * @prop {string} title - e.g. "Javascript"
 * @prop {string} extname - extension name, e.g. .js, .sh, .py
 * @prop {string} default - default {Client}.info.key
 * @prop {Array<Client>} clients
 */

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

  /**
   * Includes client files with their code building functions + infos
   * @returns {Object.<string, { clients: Object.<string, Client>, key, title, extname,default }>}
   */
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

  /**
   * @returns {Array<Target>}
   */
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
