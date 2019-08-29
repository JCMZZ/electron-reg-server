'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, service } = this;
    try {
      ctx.validate({
        email: {type: 'email', required: true, allowEmpty: false}
      },{email: ''});
    } catch (error) {
      ctx.body = JSON.stringify(error.errors[0]);
      return 
    }

    // let content = await service.login.find();
    ctx.body = JSON.stringify(content);
  }
}

module.exports = LoginController;
