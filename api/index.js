export default function http(axios) {
    return {
        /**
         * 注册
         */
        // async register() {
        //     console.log(999)
        //     await axios.post('users/register')
        // }
        async login(userInfo) {
            const res = await axios.post('users/login', userInfo)
            console.log(res)
        }
    }
}
