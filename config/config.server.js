'use strict';
module.exports = {
    REGTOKEN: 'REG-TOKEN',
    COOKIE: {
        encrypt: true,
        maxAge: 3600 * 1000,
        httpOnly: true
    },
    security: {
        csrf: {
            ignore: ['/user/create', '/user/login']
        }
    }
};
