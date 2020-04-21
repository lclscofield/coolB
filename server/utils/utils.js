const crypto = require('crypto')
const { logger } = require('../log4')

module.exports = {
    /**
     * 生成随机盐
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

    async validateError(ctx, schema, data) {
        try {
            // 验证参数
            await schema.validateAsync(data)
        } catch (err) {
            logger.error(err)
            ctx.body = {
                success: false,
                errMsg: '参数错误'
            }
            return true
        }
    }
}
