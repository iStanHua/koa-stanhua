'use strict'

const Controller = require('./index')
const Weather = require('../cheerio/weather')

class weatherController extends Controller {
  constructor() {
    super()
  }

  /**
   * 查询天气
   * @param {String} code 城市英文名称
   */
  async query(ctx, next) {
    let _body = { code: 200, msg: '' }
    let { code } = ctx.params
    let result = await Weather.query(code)
    if (result.code) {
      _body = result
    }
    else {
      _body.data = result
    }
    this.success(ctx, _body)
  }
}

module.exports = new weatherController()