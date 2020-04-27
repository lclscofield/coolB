// 引用mongoose模块
const mongoose = require('mongoose')

const { logger } = require('../log4')

// mongoose.Schema 方法用来定义数据集的格式
const Schema = mongoose.Schema

// 用户信息数据格式
const UserSchema = new Schema(
    {
        username: String, // 定义一个属性 username，类型为 String
        password: String, // 哈希密码
        salt: String, // 加密盐值
        imgUrl: String, // 头像
        phone: String, // 手机
        email: String // 邮箱
    },
    {
        timestamps: {
            createdAt: 'createTime',
            updatedAt: 'updateTime'
        }
    }
)

const UserModel = mongoose.model('Users', UserSchema)

module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const doc = await UserModel.create(userInfo)
        logger.info('create user:', doc._id, doc.username)
        return doc
    },

    /**
     * 根据用户名查找用户
     * @param {string} username
     */
    async findUserForUsername(username) {
        const doc = await UserModel.findOne({
            username
        })
        return doc
    },

    /**
     * 登录，验证账号和密码
     * @param {string} account
     */
    async login(account) {
        const doc = await UserModel.findOne({
            $or: [{ username: account }, { email: account }, { phone: account }]
        })
        return doc
    }
}
