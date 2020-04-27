const userModel = require('../models/users')
const { creatHashAvatar } = require('../utils/avatar')
const { createSalt, createHash } = require('../utils/utils')
const utilsSendEmailCode = require('../utils/email').sendEmailCode
const { emailCodes } = require('../stores')

// 业务层
module.exports = {
    /**
     * 创建用户
     * @param {object} userInfo
     */
    async create(userInfo) {
        const { username, password, emailMessageId, code } = userInfo

        // 验证邮箱验证码
        const emailCode = emailCodes.get(emailMessageId)
        if (!emailCode || emailCode.code !== code) {
            return {
                success: false,
                errMsg: '验证码错误'
            }
        }

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
            delete userInfo.emailMessageId
            delete userInfo.code
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
    },

    /**
     * 登录
     * @param {object} userInfo
     */
    async login(userInfo) {
        const { account, password } = userInfo

        // 通过账号获取数据，然后验证密码
        const doc = await userModel.login(account)
        if (doc) {
            // 密码用盐值加密对比
            const hashPassword = createHash(password + ':' + doc.salt)
            if (hashPassword === doc.password) {
                console.log(123)
                return {
                    success: true
                }
            }
        }
        return {
            success: false,
            errMsg: '账号密码错误'
        }
    },

    /**
     * 发送邮箱验证码
     * @param {string} email
     */
    async sendEmailCode(email) {
        const res = await utilsSendEmailCode(email)

        if (res && res.messageId) {
            // 暂时存储邮件激活码
            emailCodes.set(res.messageId, {
                ...res,
                limitTime: Date.now() + 90000 // 过期时间 90s
            })
            return {
                success: true,
                messageId: res.messageId
            }
        } else {
            return {
                success: false,
                errMsg: '邮件发送失败，请稍后重试'
            }
        }
    }
}
