const Joi = require('@hapi/joi')
const usersServices = require('../services/users')
const { logger } = require('../log4')
const { validateError } = require('../utils/utils')

// 注册参数验证
const schemaRegister = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(1)
        .max(12)
        .required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    emailMessageId: Joi.string(),
    code: Joi.number()
})
// 发送邮箱参数验证
const schemaSendEmail = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2
    })
})

// 用户行为处理
module.exports = {
    /**
     * 用户注册
     */
    async register(ctx) {
        const postData = ctx.request.body
        logger.info(ctx.url, ctx.path, postData.username)

        if (await validateError(ctx, schemaRegister, postData)) return

        const data = await usersServices.create(postData)
        // if (data.success) {
        //     ctx.session.logged = true
        // }
        ctx.body = data
    },

    /**
     * 用户登录
     */
    async login(ctx) {
        await console.log(456)
    },

    /**
     * 发送邮箱验证码
     */
    async sendEmailCode(ctx) {
        const postData = ctx.request.body

        if (await validateError(ctx, schemaSendEmail, postData)) return

        const data = await usersServices.sendEmailCode(postData.email)
        ctx.body = data
    }
}
