const Service = require('egg').Service;
class UserService extends Service {
  /**
   * 获取用户信息
   * @param {String} user_id
   */
  async info(user_id) {
    const { app } = this;
    return await app.mysql.get('reg_user', {
      user_id
    });
  }
}

module.exports = UserService;