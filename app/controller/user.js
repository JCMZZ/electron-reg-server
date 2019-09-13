'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 用户信息
   */
  async info() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        userid: {type: 'required', message: 'Userid cannot be empty！'}
      });
      try {
        let { update_time, state, pwd, ...user} = await service.user.info(ctx.request.body.userid);
        let labels = await service.user.label(ctx.request.body.userid);
        service.common.log({
          module: 'user',
          desc: '查看账号信息'
        });
        ctx.success = {result: { user, labels }};
      } catch (err) {
        ctx.fail = {result: err, message: 'The user does not exist！'};
      }
    } catch (err) {
      ctx.fail = {result: err, ...ctx.helper.verify_er(err)};
    }
  }
}

module.exports = UserController;
