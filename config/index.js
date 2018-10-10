const path = require('path')
const lodash = require('lodash')

let env = process.env.npm_lifecycle_event
const rootDir = path.normalize(path.join(__dirname, '/..'))

// configure env
if (env === 'start' || env === 'dev') {
  env = 'development'
}
if (env === 'prd') {
  env = 'production'
}

// configure app
const app = {
  env,
  corsOpts: {
    credentials: true
  },
  bodyparserOpts: {
    enableTypes: ['json', 'form', 'text']
  },
  staticPath: `${rootDir}/dist`,
  viewsPath: `${rootDir}/views`,
  viewsOpts: {
    map: {
      html: 'nunjucks'
    }
  }
}

// configure api and port
const api = {
  development: {
    api: 'https://www.apiopen.top',
    port: 3022
  },
  testing: {
    api: 'http://test.xx.com/api',
    port: 3020
  },
  release: {
    api: 'http://release.xx.com/api',
    port: 3018
  },
  production: {
    api: 'http://prod.xx.com/api',
    port: 3016
  }
}

module.exports = lodash.merge(app, api[env])
