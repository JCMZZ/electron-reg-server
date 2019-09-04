'use strict';
/**
 * 账户注册
 */
const Controller = require('egg').Controller;
class RegisterController extends Controller {
  async createUser() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        email: {type: 'email', allowEmpty: false},
        pwd: {type: 'password', allowEmpty: false, max: 32, min: 32 }
      });
      let isRegister = await service.login.validateAccount(ctx.request.body.email);
      if(isRegister) {
        ctx.fail = { message: 'Account already exists！' };
        return 
      }
      await service.register.createUser();
    } catch (err) {
      ctx.fail = {result: err, ...ctx.helper.verify_er(err)};
    }
  }
}

module.exports = RegisterController;
