'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        email: {type: 'email', allowEmpty: false},
        pwd: {type: 'password', allowEmpty: false}
      });
      let result = await service.login.validateUser(ctx.request.body);
      ctx.success = {result};
    } catch (err) {
      ctx.fail = {result: err, ...ctx.helper.verify_er(err)};
    }
  }
}

module.exports = LoginController;
