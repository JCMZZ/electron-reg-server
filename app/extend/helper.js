module.exports = {
    /**
     * 校验响应信息
     * @param {Object} err 验证失败对象
     */
    verify_er(err) {
        let {
            message,
            field,
            code
        } = err.errors[0];
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