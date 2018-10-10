const compose = require('koa-compose')
const cors = require('@koa/cors')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const serve = require('koa-static')
const views = require('koa-views')

const config = require('../config')
const timelogger = require('./logger')

module.exports = compose([
  cors(config.corsOpts),
  bodyparser(config.bodyparserOpts),
  json(),
  logger(),
  serve(config.staticPath),
  views(config.viewsPath, config.viewsOpts),
  timelogger
])
