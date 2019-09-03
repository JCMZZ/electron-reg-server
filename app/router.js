'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { permission } =  middleware;
  router.post('/login', controller.login.index);
  router.post('/create/user', controller.register.createUser);
  router.post('/home', permission('OPER_ROLE_MANAGEMENT_ADD'), controller.home.index);
};
