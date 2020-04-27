import http from '../api'

export default function(ctx, inject) {
    const { $axios, redirect } = ctx
    // 自定义封装 api
    const axios = $axios.create()
    const api = http(axios)
    inject('api', api)
    ctx.$api = api

    // request interceptor 请求拦截
    axios.interceptors.request.use(
        config => {
            // 发送请求之前对参数做些处理
            return config
        },
        error => {
            // 请求错误处理
            return Promise.reject(error)
        }
    )
    axios.onRequest(config => {
        console.log('访问接口:' + config.baseURL + '/' + config.url)
    })

    // response interceptor 响应拦截
    axios.interceptors.response.use(
        /**
         * Determine the request status by custom code
         * Here is just an example
         * You can also judge the status by HTTP Status Code
         */
        response => {
            const res = response.data
            console.log(111, res)
            if (res.success && process.browser) {
                return res
            }
            // redirect('/404')
            // return Promise.reject(new Error(res.errMsg || 'Error'))
        },
        error => {
            console.log(error) // for debug

            return Promise.reject(error)
        }
    )

    // 错误处理
    axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}
