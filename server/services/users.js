const userModel = require('../models/users')
const { creatHashAvatar } = require('../utils/avatar')
const { createSalt, createHash } = require('../utils/utils')

// 业务层
module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const { username, password } = userInfo
        const doc = await userModel.findUserForUsername(username)
        if (!doc) {
            // 给新用户生成哈希头像
            const imgUrl = creatHashAvatar(username)
            userInfo.imgUrl = imgUrl

            // 生成盐
            const salt = createSalt()
            userInfo.salt = salt

            // 密码用盐值加密
            userInfo.password = createHash(password + ':' + salt)

            // 存库
            await userModel.create(userInfo)
            return {
                success: true
            }
        } else {
            return {
                success: false,
                errMsg: '用户名重复'
            }
        }
    }
}
