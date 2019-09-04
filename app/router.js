'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { permission } =  middleware;
  router.post('/user/login', controller.login.index);
  router.post('/user/create', controller.register.createUser);
  router.post('/log', permission('OPER_ROLE_MANAGEMENT_ADD'), controller.system.log);
};
