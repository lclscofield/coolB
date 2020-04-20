const usersServices = require('../services/users')

// 用户行为处理
module.exports = {
    /**
     * 用户注册
     */
    async register(ctx) {
        console.log(123)
        await usersServices.create(ctx)
    },

    /**
     * 用户登录
     */
    async login(ctx) {
        await console.log(456)
    }
}
