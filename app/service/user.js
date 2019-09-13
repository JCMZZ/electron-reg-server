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
  async label(user_id) {
    const { app } = this;
    return await app.mysql.query(`SELECT
                                    l.label_name,l.label_id
                                  FROM
                                    reg_label l,
                                    reg_user_label ul
                                  WHERE
                                    l.label_id = ul.label_id
                                  AND ul.user_id = ?`, user_id);
  }
}

module.exports = UserService;