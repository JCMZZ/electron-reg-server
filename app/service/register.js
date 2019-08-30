const Service = require('egg').Service;
const crypto = require('crypto');
class RegisterService extends Service {
  async createUser() {
    const { ctx, app } = this;
    let { email, pwd } = ctx.request.body;
    try {
      ctx.success = { 
        result: await app.mysql.insert('reg_user', { 
          email, 
          pwd: crypto.createHash('md5').update(pwd).digest('hex')
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