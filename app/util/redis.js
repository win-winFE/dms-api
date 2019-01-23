'use strict';

const Redis = require('ioredis');

const constants = require('./constants');

const redis = new Redis(constants.redisConf);

const customRedisLib = Object.assign({}, redis);

// 默认过期时间43200秒：12h
customRedisLib.set = async (key, val, expired = 43200) => {
  key = constants.redisKeyPrefix + key;
  const res = await redis.set(key, val, 'EX', expired);
  return res;
};

customRedisLib.get = async key => {
  key = constants.redisKeyPrefix + key;
  const res = await redis.get(key);
  return res;
};

module.exports = customRedisLib;
