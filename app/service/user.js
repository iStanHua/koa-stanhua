'use strict'

const Service = require('./index')

class UserService extends Service {
    constructor() {
        super()
    }

    /**
     * 新增用户
     * @param {Object} data 用户数据
     * @returns result
     */
    async addUser(data) {
        if (data.name) {
            let res = await this.count('user', { name: data.name })
            if (res) {
                return this.errorInfo.found('该用户名')
            }
        }
        else {
            data.name = Math.random().toString(16).substr(3)
        }
        if (data.phone) {
            let res = await this.count('user', { phone: data.phone })
            if (res) {
                return this.errorInfo.found('该手机号')
            }
        }
        if (data.email) {
            let res = await this.count('user', { email: data.email })
            if (res) {
                return this.errorInfo.found('该邮箱')
            }
        }

        return await this.insert('user', data)
    }
    /**
     * 修改用户
     * @param {Number} id 
     * @param {Object} data 
     */
    async updateUser(id, data) {
        let res = await this.count('user', { id: id })
        if (!res) {
            return this.errorInfo.unexist('该用户')
        }
        return await this.update('user', data, { id: id })
    }
    /**
    * 删除用户
    * @param {Number} id     用户编号
    * @param {Boolean} flag  是否真删
    * @returns result
    */
    async deleteUser(id, flag = false) {
        let res = await this.count('user', { id: id })
        if (!res) {
            return this.errorInfo.unexist('该用户')
        }
        if (flag) {
            return await this.delete('user', { id: id })
        }
        else {
            return await this.updateUser(id, { atcive: 0 })
        }
    }
    /**
     * 用户详情
     * @param {Number} id 
     */
    async userDetail(id) {
        let res = await this.count('user', { id: id })
        if (!res) {
            return this.errorInfo.unexist('该用户')
        }
        return await this.get('user', {
            where: {
                id: id,
                active: 1
            },
            attributes: {
                exclude: ['password', 'active']
            }
        })
    }
    /**
     * 用户列表
     * @param {Number} data.page_index 页码索引
     * @param {Number} data.page_size  每页显示记录数
     * @returns result
     */
    async userList(data) {
        data.page_index = data.page_index || 1
        data.page_size = data.page_size || 10
        let options = {
            where: {
                active: 1
            },
            attributes: {
                exclude: ['password', 'active']
            },
            offset: (data.page_index - 1) * data.page_size,
            limit: data.page_size,
            order: [['created_time', 'DESC']]
        }
        return await this.select('user', options)
    }

    /**
     * 用户登录
     * @param {Object} data 用户数据
     */
    async login(data) {
        let options = {
            where: {
                active: 1
            },
            attributes: {
                exclude: ['password', 'active']
            }
        }
        if (data.phone) {
            options.where.phone = data.phone
            let res = await this.count('user', options)
            if (!res) {
                return this.errorInfo.unexist('该手机号')
            }
        }
        else if (data.email) {
            options.where.email = data.email
            let res = await User.count(options)
            if (!res) {
                return this.errorInfo.unexist('该邮箱')
            }
        }
        options.where.password = data.password
        let result = await this.get('user', options)
        if (!result) {
            result = this.errorInfo.unmatch('账号', '密码')
        }
        return result
    }
}

module.exports = new UserService()