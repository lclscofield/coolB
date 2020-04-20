const userModel = require('../models/users')

// 业务层
module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const res = await userModel.create(userInfo)
        return res
    }
}
