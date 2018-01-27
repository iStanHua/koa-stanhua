'use strict'

class errorInfo {
    constructor() {
        this.util = require('util')

        this.UNKNOWN = { code: -1, msg: '未知错误' }
        this.NOTFOUND = { code: 400, msg: '未找到' }
        this.UNAUTHORIZED = { code: 401, msg: '尚未登录' }
        this.SERVEREORROR = { code: 500, msg: '内部服务器错误' }
        this.NODATA = { code: 1000, msg: '没有相关数据' }
        this.REQUIRED = { code: 1001, msg: '%s不能为空' }
        this.FOUND = { code: 1002, msg: '%s已存在' }
        this.INVALID = { code: 1003, msg: '%s字段无效' }
        this.MISMATCH = { code: 1004, msg: '%s和%s不匹配' }
        this.UNEXIST = { code: 1005, msg: '%s不存在' }
        this.WRONGFORMAT = { code: 1006, msg: '%s格式有误' }
    }
    /**
     * 未知错误
     */
    unknown() {
        return Object.assign({}, this.UNKNOWN)
    }
    /**
     * 未找到
     */
    notfound() {
        return Object.assign({}, this.NOTFOUND)
    }
    /**
     * 尚未登录
     */
    unauthorized() {
        return Object.assign({}, this.UNAUTHORIZED)
    }
    /**
     * 尚未登录
     */
    serverError() {
        return Object.assign({}, this.SERVEREORROR)
    }
    /**
     * 没有相关数据
     */
    nodata() {
        return Object.assign({}, this.NODATA)
    }
    /**
     * 必填
     */
    required(value) {
        let _body = Object.assign({}, this.REQUIRED)
        _body.msg = this.util.format(_body.msg, value)
        return _body
    }
    /**
     * 已存在
     */
    found(value) {
        let _body = Object.assign({}, this.FOUND)
        _body.msg = this.util.format(_body.msg, value)
        return _body
    }
    /**
     * 字段无效
     */
    invalid(value) {
        let _body = Object.assign({}, this.INVALID)
        _body.msg = this.util.format(_body.msg, value)
        return _body
    }
    /**
     * 不匹配
     */
    unmatch(value1, value2) {
        let _body = Object.assign({}, this.MISMATCH)
        _body.msg = this.util.format(_body.msg, value1, value2)
        return _body
    }
    /**
     * 不存在
     */
    unexist(value) {
        let _body = Object.assign({}, this.UNEXIST)
        _body.msg = this.util.format(_body.msg, value)
        return _body
    }
    /**
     * 格式有误
     */
    wrongFormat(value) {
        let _body = Object.assign({}, this.WRONGFORMAT)
        _body.msg = this.util.format(_body.msg, value)
        return _body
    }
}

module.exports = new errorInfo()