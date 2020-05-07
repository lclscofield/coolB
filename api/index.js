import Message from 'ant-design-vue/lib/message' // 全局提示

export default function http(axios) {
    return {
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
        }
    }
}
