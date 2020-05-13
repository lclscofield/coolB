import Message from 'ant-design-vue/lib/message' // 全局提示

export default function http(axios) {
    return {
        /**
         * 注册
         * @param {object} userInfo
         */
        async fetch_register(userInfo) {
            const res = await axios.post('users/register', userInfo)
            res && Message.success('注册成功')
            return res
        },

        /**
         * 账号密码登录
         * @param {object} userInfo
         */
        async fetch_login(userInfo) {
            const res = await axios.post('users/login', userInfo)
            res && Message.success('登录成功')
            return res
        },

        /**
         * 通过 id 获取用户信息
         * @param {string} id
         */
        async fetch_getUserInfoById(id) {
            const res = await axios.post('users/getUserInfoById', { id })
            return res
        },

        /**
         * 发送邮箱验证码
         * @param {string} email
         */
        async fetch_sendEmailCode(email) {
            const res = await axios.post('users/sendEmailCode', { email })
            res && Message.success('邮件发送成功')
            return res
        }
    }
}
