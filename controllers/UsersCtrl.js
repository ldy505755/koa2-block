module.exports = class UsersCtrl {
  // users
  static async users(ctx, next) {
    const res = 'this is a users response!'
    ctx.body = res
  }

  // users/bar
  static async bar(ctx, next) {
    const res = 'this is a users/bar response'
    ctx.body = res
  }
}
