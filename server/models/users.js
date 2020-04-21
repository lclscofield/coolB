// 引用mongoose模块
const mongoose = require('mongoose')

// mongoose.Schema 方法用来定义数据集的格式
const Schema = mongoose.Schema

// 用户信息数据格式
const UserSchema = new Schema({
    username: String, // 定义一个属性 username，类型为 String
    password: String, // 哈希密码
    salt: String, // 加密盐值
    phone: String, // 手机
    imgUrl: String // 头像
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const res = await UserModel.create(userInfo)
        console.log('create user:', res._id, res.username)
        return res
    },

    /**
     * 根据用户名查找用户
     * @param {string} username
     */
    async findUserForUsername(username) {
        const res = await UserModel.findOne({
            username
        })
        return res
    }
}
