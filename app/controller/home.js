'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.success = {result: { session: ctx.session, token: ctx.helper.getCookie()}}
  }
}

module.exports = HomeController;
