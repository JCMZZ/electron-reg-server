/* eslint valid-jsdoc: "off" */

'use strict';
const { mysql } = require('./config.mysql');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_regexp';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'reg',
    cluster: {
      listen: {
        port: 8888
      }
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
