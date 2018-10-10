const compose = require('koa-compose')
const router = require('koa-router')()
const IndexCtrl = require('../controllers/IndexCtrl')

router.get('/', IndexCtrl.index)

router.get('/string', IndexCtrl.string)

router.get('/json', IndexCtrl.json)

module.exports = compose([router.routes(), router.allowedMethods()])
