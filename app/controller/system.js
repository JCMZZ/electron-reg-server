'use strict';

const Controller = require('egg').Controller;

class SystemController extends Controller {
  async getCsrfToken() {
    const { ctx } = this;
    ctx.success = { message: 'get csrf token OK!' };
  }
  async log() {
    const { ctx } = this;
    ctx.success = {result: { session: ctx.session, token: ctx.helper.getCookie()}};
  }
}

module.exports = SystemController;
