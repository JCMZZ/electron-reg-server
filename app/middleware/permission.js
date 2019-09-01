module.exports = (options, app) => {
    return async (ctx, next) => {
      let { helper } = ctx;
      let cookie = helper.getCookie();
      if(!cookie) {
        ctx.fail = {message: 'Please login first！'}
        return
      }
      let {user, roles, navs} = ctx.session[helper.crypto(cookie)];
      console.log('经过中间件')
      // ctx.redirect('/login');   // 让用户去登录
      await next();
    };
  };