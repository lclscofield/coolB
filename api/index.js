export default function http(axios) {
    return {
        /**
         * 注册
         */
        // async register() {
        //     console.log(999)
        //     await axios.post('users/register')
        // }
        async login() {
            const res = await axios.post('users/login', {
                account: 'lcl',
                password: '123456'
            })
            console.log(res)
        }
    }
}
