const Service = require('egg').Service;

class RegisterService extends Service {
  async createUser() {
    const { ctx, app } = this;
    try {
      ctx.success = { 
        result: await app.mysql.insert('reg_user', this.ctx.request.body), 
        message: 'registered successfully！'
      };
    } catch (error) {
      ctx.fail = {
        result: error, 
        message: "fail to register！"
      };
    }
  }
}

module.exports = RegisterService;