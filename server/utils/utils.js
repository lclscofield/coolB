const crypto = require('crypto')
const { logger } = require('../log4')

module.exports = {
    /**
     * 生成随机 5 位盐值
     */
    createSalt() {
        return Math.random()
            .toString()
            .slice(2, 7)
    },

    /**
     * 根据字符串生成哈希值
     * @param {String} str
     */
    createHash(str) {
        const hash = crypto.createHash('md5')
        hash.update(str)
        return hash.digest('hex')
    },

    /**
     * 验证参数
     * @param {object} ctx
     * @param {object} schema 规则
     * @param {object} data 数据
     */
    async validateError(ctx, schema, data) {
        try {
            await schema.validateAsync(data)
        } catch (err) {
            logger.error(err)
            ctx.body = {
                success: false,
                errMsg: '参数错误'
            }
            return true
        }
    },

    /**
     * 生成随机验证码，默认 4 位，最多 8 位
     * @param {number} num
     */
    createCode(num = 4) {
        if (num > 8) num = 8
        return Math.random()
            .toString()
            .slice(2, 2 + num)
    }
}
