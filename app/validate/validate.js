const { empty } = require('../extend/helper');
module.exports = app => {
    app.validator.addRule('required', (rule, value) => {
        if (empty(value)) {
            return rule.message;
        }
    });
}