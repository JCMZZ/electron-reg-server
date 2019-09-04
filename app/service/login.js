const Service = require('egg').Service;
class LoginService extends Service {
  /**
   * 是否合法登录
   * @param {Object} 账号、密码
   */
  async validateUser({email, pwd}) {
    const { app } = this;
    return await app.mysql.get('reg_user', {
      email,
      pwd: new app.mysql.literals.Literal(`md5('${pwd}')`)
    });
  }
  /**
   * 验证邮箱是否被注册过
   * @param {String} email 账号
   */
  async validateAccount(email) {
    const { app } = this;
    return await app.mysql.get('reg_user', {
      email
    });
  }
}

module.exports = LoginService;