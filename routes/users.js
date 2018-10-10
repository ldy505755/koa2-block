const compose = require('koa-compose')
const router = require('koa-router')()
const UsersCtrl = require('../controllers/UsersCtrl')

router.prefix('/users')

router.get('/', UsersCtrl.users)

router.get('/bar', UsersCtrl.bar)

module.exports = compose([router.routes(), router.allowedMethods()])
