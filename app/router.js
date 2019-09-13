'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const { permission } =  middleware;
  /* 安全威胁csrf的防范 */
  router.get('/getcsrftoken', controller.system.getCsrfToken);
  /* 用户 */
  router.post('/user/login', controller.login.index);
  router.post('/user/create', controller.register.createUser);
  router.post('/user/info', permission('OPER_USER_MANAGEMENT_MODIFY'), controller.user.info);
  router.post('/log', permission('OPER_ROLE_MANAGEMENT_ADD'), controller.system.log);
};
