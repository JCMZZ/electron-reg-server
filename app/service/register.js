const Service = require('egg').Service;

class RegisterService extends Service {
  async create() {
    const { mysql } = this.app;
    this.ctx.request.body.title
    const user = await mysql.select('reg_user');
    return user
  }
}

module.exports = RegisterService;