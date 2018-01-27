'use strict'

class Service {
    constructor() {
        this.DB = require('../model')
        
        this.errorInfo = require('../extend/errorInfo')
    }
    /**
     * 执行sql语句
     * @param {String} sql     sql语句
     * @param {Object} values  值
     * @returns result
     */
    async query(sql, values = {}) {
        try {
            return await this.DB.sequelize.query(sql, values)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 新增
     * @param {String} table   模块名
     * @param {Object} values  值
     */
    async insert(table, values = {}) {
        try {
            if (!values.created_time) {
                values.created_time = new Date().getTime()
            }
            if (!values.updated_time) {
                values.updated_time = new Date().getTime()
            }
            return await this.DB[table].create(values)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 批量新增
     * @param {String} table   模块名
     * @param {Array}  records  从中创建实例的对象列表（键/值对）
     * @returns result
     */
    async bulkInsert(table, records = []) {
        return await this.DB[table].bulkCreate(records)
    }
    /**
     * 新增或修改
     * @param {String} table   模块名
     * @param {Object} values  值
     * @param {Object} where   where值
     */
    async insertOrUpdate(table, values = {}, where = {}) {
        try {
            let res = await this.count(table, { where: where })
            if (!values.updated_time) {
                values.updated_time = new Date().getTime()
            }
            if (res) {
                return await this.update(table, values, where)
            }
            else {
                if (!values.created_time) {
                    values.created_time = new Date().getTime()
                }
                return await this.insert(table, values)
            }
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 修改
     * @param {String} table   模块名
     * @param {Object} values  值
     * @param {Object} where   where值
     */
    async update(table, values = {}, where = {}) {
        try {
            if (!values.updated_time) {
                values.updated_time = new Date().getTime()
            }
            return await this.DB[table].update(values, { where: where })
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 删除
     * @param {String} table   模块名
     * @param {Object} where   where值
     */
    async delete(table, where = {}) {
        try {
            return await this.DB[table].destroy({ where: where })
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 找到与查询匹配的行，或者如果没有找到，则构建并保存该行
     * @param {String} table   模块名
     * @param {Object} where    查询条件 
     * @param {Object} defaults 默认值 
     * @returns result 
     */
    async getOrInsert(table, where = {}, defaults = {}) {
        let result = await this.get(table, { where: where })
        if (!result) {
            result = await this.insert(table, defaults)
        }
        return result
    }
    /**
     * 查询一条记录
     * @param {String} table   模块名
     * @param {Object} options 参数(where)
     * @returns result
     */
    async get(table, options = {}) {
        try {
            return await this.DB[table].findOne(options)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 查询多条记录
     * @param {String} table   模块名
     * @param {Object} options 参数(where)
     * @returns result
     */
    async select(table, options = {}) {
        try {
            return await this.DB[table].findAndCountAll(options)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 记录数
     * @param {String} table   模块名
     * @param {Object} where   where值
     * @returns result
     */
    async count(table, where = {}) {
        try {
            return await this.DB[table].count({ where: where })
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    } /**
    * 找到字段的总和
    * @param {String} table   模块名
    * @param {String} field   字段
    * @param {Object} options 参数
    * @returns result 
    */
    async sum(table, field, options = {}) {
        try {
            return await this.DB[table].sum(field, options)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 找到字段的最大值
     * @param {String} table   模块名
     * @param {String} field   字段
     * @param {Object} options 参数
     * @returns result 
     */
    async max(table, field, options = {}) {
        try {
            return await this.DB[table].max(field, options)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
    /**
     * 找到字段的最小值
     * @param {String} table   模块名
     * @param {String} field   字段
     * @param {Object} options 参数
     * @returns result 
     */
    async min(field, options = {}) {
        try {
            return await this.DB[table].min(field, options)
        }
        catch (err) {
            console.log(err)
            return this.errorInfo.SERVEREORROR
        }
    }
}

module.exports = Service