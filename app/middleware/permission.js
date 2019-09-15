module.exports = (authCode) => {
  return async (ctx, next) => {
    let { helper } = ctx;
    if (authCode) {
      /* 是否ajax请求 */
      let isAjax = Boolean(ctx.get('X-Requested-With'));
      let cookie = helper.getCookie();
      /**
       * 未登陆
       */
      if (!cookie) {
        ctx.fail = {
          message: 'Please login first！',
          code: 4011
        }
        return
      }
      let { navs } = await helper.Rget(helper.crypto(cookie));
      let opers = navs.reduce((opers, nav) => {
        nav.pages.forEach(page => {
          opers = opers.concat(page.opers.map(oper => oper.oper_code))
        });
        return opers
      }, []);
      /**
       * 未授权
       */
      if (!opers.includes(authCode)) {
        ctx.fail = {
          message: 'No operation permission！',
          code: 4014
        }
        return
      }
    }
    await next();
  };
};