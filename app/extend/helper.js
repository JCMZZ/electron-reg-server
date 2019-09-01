const crypto = require('crypto');
module.exports = {
    /**
     * 设置cookie
     * @param {String} value 电子邮箱 
     */
    setCookie(value) {
        let { ctx, app } = this;
        ctx.cookies.set(app.config.REGTOKEN, value, app.config.COOKIE);
    },
    getCookie() {
        let { ctx, app } = this;
        return ctx.cookies.get(app.config.REGTOKEN, app.config.COOKIE);
    },
    /**
     * 加密
     * @param {String} key 被加密的串 
     */
    crypto(key) {
        return crypto.createHmac('sha256', this.app.config.keys).update(key).digest('hex')
    },
    /**
     * 解析校验失败信息
     * @param {Object} err 验证失败对象
     */
    verify_er(err) {
        let { message, field, code } = err.errors[0];
        let designation = field;
        field === 'pwd' && (designation = "password");
        if (code === "missing_field") {
            message = `${designation}: This request parameter is missing`;
        }
        if (code === "invalid") {
            message = `${designation}:` + message;
        }
        return {
            code: 422,
            message
        }
    }
}