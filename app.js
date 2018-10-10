const Koa = require('koa')
const onerror = require('koa-onerror')

const middlewares = require('./middlewares')
const routes = require('./routes/routes')

const app = new Koa()
// error handler
onerror(app)

// middlewares
app.use(middlewares)

// routes
app.use(routes)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
