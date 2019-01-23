'use strict';

// had enabled by egg
// exports.static = true;

exports.redis = {
  package: 'egg-redis',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
