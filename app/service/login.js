const Service = require('egg').Service;
const crypto = require('crypto');
class LoginService extends Service {
  async validateUser({email, pwd}) {
    const { app } = this;
    return await app.mysql.select('reg_user',{where: {
      email,
      pwd: crypto.createHash('md5').update(pwd).digest('hex')
    }});
  }
}

module.exports = LoginService;