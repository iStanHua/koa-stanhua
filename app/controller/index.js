'use strict'

class Controller {
    constructor() {
        this.md5 = require('../extend/md5')
        this.validate = require('../extend/validate')

        this.errorInfo = require('../extend/errorInfo')
    }

    /**
     * 输出格式化
     */
    success(ctx, options) {
        ctx.status = 200
        ctx.body = {
            code: options.code,
            msg: options.msg
        }
        if (options.data) {
            ctx.body.data = options.data
        }
    }
    /**
   * 通用
   */
    common(ctx, msg) {
        let _body = { code: 1002, msg: msg }
        return this.success(ctx, _body)
    }
    /**
     * 长度区间
     */
    rangeLength(ctx, name, min, max) {
        let _body = { code: 1002, msg: '%s长度必须在%s-%s位之间' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, min, max)
        return this.success(ctx, _body)
    }
    /**
     * 长度最小
     */
    minLength(ctx, name, min) {
        let _body = { code: 1002, msg: '%s长度最小为%s' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, min)
        return this.success(ctx, _body)
    }
    /**
     * 长度最大
     */
    maxLength(ctx, name, max) {
        let _body = { code: 1002, msg: '%s长度最多为%s' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, max)
        return this.success(ctx, _body)
    }
    /**
     * 值区间
     */
    range(ctx, name, min, max) {
        let _body = { code: 1002, msg: '%s值必须在%s-%s之间' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, min, max)
        return this.success(ctx, _body)
    }
    /**
     * 最小
     */
    min(ctx, name, min) {
        let _body = { code: 1002, msg: '%s值不能小于%s' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, min)
        return this.success(ctx, _body)
    }
    /**
     * 最大
     */
    max(ctx, name, max) {
        let _body = { code: 1002, msg: '%s值不能大于%s' }
        _body.msg = this.errorInfo.util.format(_body.msg, name, max)
        return this.success(ctx, _body)
    }
    /**
     * 纯数字
     */
    pureNumber(ctx, name) {
        let _body = { code: 1002, msg: '%s不能为纯数字' }
        _body.msg = this.errorInfo.util.format(_body.msg, name)
        return this.success(ctx, _body)
    }
}

// module.exports = new Controller()
module.exports = Controller