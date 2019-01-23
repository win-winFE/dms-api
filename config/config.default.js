'use strict';

module.exports = appInfo => {
  const config = exports = {
    sequelize: {
      dialect: 'mysql',
      database: 'winwinfe_dms',
      host: '127.0.0.1',
      port: '3306',
      username: 'root',
      password: 'root1234',
      timezone: '+08:00',
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
    },
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: null,
        db: 0,
      },
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1544060563550_4895';

  // add your config here
  config.middleware = [];

  return config;
};
