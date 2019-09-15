'use strict';

/** @type Egg.EggPlugin */
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};