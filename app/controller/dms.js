'use strict';

const Controller = require('egg').Controller;

const response = require('../util/response');
const redis = require('../util/redis');

class DMSController extends Controller {
  async getData() {
    const { ctx } = this;
    const { params, enableReview } = ctx.queries;
    // 获取临时数据？y：临时，n：正式
    const paramsData = parseInt(enableReview) === 1 ? `y${params}` : `n${params}`;
    const redisRes = await redis.get(paramsData);
    if (redisRes) {
      ctx.body = response.success(JSON.parse(redisRes));
      return;
    }
    const dataRes = await ctx.model.Data.findOneByParams(paramsData);
    if (dataRes) {
      const { data } = dataRes.dataValues;
      await redis.set(paramsData, data);
      ctx.body = response.success(JSON.parse(data));
      return;
    }
    ctx.body = response.success(null);
  }

  async getTempData() {
    const { ctx } = this;
    const { params } = ctx.queries;
    const paramsData = `y${params}`;
    const dataRes = await ctx.model.Data.findOneByParams(paramsData);
    if (dataRes) {
      ctx.body = response.success(JSON.parse(dataRes.dataValues.data));
      return;
    }
    ctx.body = response.success(null);
  }

  async getRealData() {
    const { ctx } = this;
    const { params } = ctx.queries;
    const paramsData = `n${params}`;
    const dataRes = await ctx.model.Data.findOneByParams(paramsData);
    if (dataRes) {
      ctx.body = response.success(JSON.parse(dataRes.dataValues.data));
      return;
    }
    ctx.body = response.success(null);
  }
}

module.exports = DMSController;
