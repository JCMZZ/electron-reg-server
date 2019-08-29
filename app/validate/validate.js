module.exports = app => {
    app.validator.addRule('json', (rule, value) => {
        try {
            console.log(JSON.parse(value));
        } catch (err) {
            return 'must be json string';
        }
    });
}