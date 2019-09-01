const Service = require('egg').Service;
class RegisterService extends Service {
  async createUser() {
    const { ctx, app } = this;
    let { email, pwd } = ctx.request.body;
    try {
      ctx.success = { 
        result: await app.mysql.insert('reg_user', { 
          email, 
          pwd: new app.mysql.literals.Literal(`md5(${pwd})`)
        }), 
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