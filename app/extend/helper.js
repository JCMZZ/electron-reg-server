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
    },
    /**
     * 获取格式化后时间
     * @param {String} formt 格式
     * @param {Date} date 时间
     */
    dbTime(formt, date) {
        date = date ? new Date(date) : new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month < 10 && (month = '0' + month);
        let day = date.getDate();
        day < 10 && (day = '0' + day);
        let hour = date.getHours();
        hour < 10 && (hour = '0' + hour);
        let minutes = date.getMinutes();
        minutes < 10 && (minutes = '0' + minutes);
        let seconds = date.getSeconds();
        seconds < 10 && (seconds = '0' + seconds);
        return formt.replace(/yy/i, year)
            .replace(/mm/i, month)
            .replace(/dd/i, day)
            .replace(/hh/i, hour)
            .replace(/:mm/i, ':' + minutes)
            .replace(/:ss/i, ':' + seconds);
    },
    /**
     * 检查变量是否为空类型值
     * @param {Any} variable 
     */
    empty(variable) {
        if(variable === null || variable === undefined || variable === '') {
            return true;
        }
        return false;
    }
}