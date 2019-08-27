'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    let content = await ctx.service.login.find();
    console.log(content)
    ctx.body = JSON.stringify(content);
  }
}

module.exports = LoginController;
