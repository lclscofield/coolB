// 引用mongoose模块
const mongoose = require('mongoose')

// mongoose.Schema 方法用来定义数据集的格式
const Schema = mongoose.Schema

// 用户信息数据格式
const UserSchema = new Schema({
    username: String, // 定义一个属性 username，类型为 String
    password: String,
    phone: String
})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const res = await UserModel.create(userInfo)
        console.log('create user:', res)
        return res
    }
}
