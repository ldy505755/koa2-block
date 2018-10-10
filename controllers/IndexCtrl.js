const axios = require('../utils/axios')
const config = require('../config')

module.exports = class IndexCtrl {
  // index
  static async index(ctx, next) {
    // axios(url, data, method)
    const res = await axios('/journalismApi')
    const data = {
      layout: `${config.viewsPath}/layout.html`,
      title: 'Hello Koa2 block!',
      tech: res.data.tech
    }
    await ctx.render('index.html', data)
  }

  // string
  static async string(ctx, next) {
    const res = 'koa2 string'
    ctx.body = res
  }

  // json
  static async json(ctx, next) {
    const res = {
      title: 'koa2 json'
    }
    ctx.body = res
  }
}
