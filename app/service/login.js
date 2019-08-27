const Service = require('egg').Service;

class LoginService extends Service {
  async find(uid) {
    const user = await this.app.mysql.select('reg_user');
    console.log('{ user }', { user })
    return { user };
  }
}

module.exports = LoginService;