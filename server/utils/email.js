// 引入 nodemailer
const nodemailer = require('nodemailer')

const { appName } = require('../../nuxt.config.js')
const { createCode } = require('./utils')

// 发送的邮箱信息
const fromEmailInfo = {
    type: 'QQ',
    user: 'lclscofield@foxmail.com', // 发送的邮箱号
    pass: 'nlvgdggsfvfofjbf' // 邮箱的 smtp 授权码
}

// 创建一个 SMTP 客户端配置
const config = {
    service: fromEmailInfo.type,
    auth: fromEmailInfo
}

// 创建一个SMTP客户端对象
const email = nodemailer.createTransport(config)

module.exports = {
    /**
     * 发送邮箱验证码
     * @param {string} toEmail
     */
    async sendEmailCode(toEmail) {
        const code = createCode()
        const res = await email.sendMail({
            from: `${appName} <${fromEmailInfo.user}>`, // 发件人
            to: toEmail, // 收件人
            subject: '邮箱验证码', // 主题
            // 发送text或者html格式
            text: `邮箱验证码: ${code}` // plain text body
            // html: '<b>Hello world?</b>' // html body
        })
        if (res && res.messageId) {
            return {
                messageId: res.messageId,
                code
            }
        }
        return false
    }
}
