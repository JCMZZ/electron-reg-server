'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, service } = this;
    let content = await service.login.find();
    ctx.body = JSON.stringify(content);
  }
}

module.exports = LoginController;
