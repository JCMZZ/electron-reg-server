class Response {
    constructor({
        code = 200,
        message = '',
        result = null,
        success = true
    }) {
        this.code = code;
        this.message = message;
        this.result = result;
        this.success = success;
    }
}
module.exports = {
    set success(value) {
        this.body = new Response(value);
    },
    set fail(value) {
        this.body = new Response({
            ...value,
            success: false
        });
    }
};