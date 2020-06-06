import Message from 'ant-design-vue/lib/message' // 全局提示
import http from '../api'
import nuxtConfig from '../nuxt.config.js'

export default function(ctx, inject) {
    const { $axios, redirect } = ctx
    // 自定义封装 api
    const axios = $axios.create({
        timeout: 5000
    })

    // 指定客户端 baseUrl 为当前 location
    // if (process.browser) {
    //     console.log(process, process.browser, process.client)
    //     $axios.setBaseURL(location.host)
    // }

    const api = http(axios)
    inject('api', api)
    ctx.$api = api

    // request interceptor 请求拦截
    axios.interceptors.request.use(
        config => {
            // 发送请求之前对参数做些处理
            if (process.browser) {
                config.baseURL = location.origin + nuxtConfig.axios.prefix
            }
            return config
        },
        error => {
            // 请求错误处理
            return Promise.reject(error)
        }
    )
    axios.onRequest(config => {
        console.log('访问接口:' + config.url)
    })

    // response interceptor 响应拦截
    axios.interceptors.response.use(
        /**
         * Determine the request status by custom code
         * Here is just an example
         * You can also judge the status by HTTP Status Code
         */
        response => {
            if (process.browser) {
                const { config } = response
                const res = response.data

                if (res.success) {
                    return res.data || true
                }

                // 根据 config 中的 isMe 来判断是否进行全局错误提示
                if (!config.isMe) {
                    Message.error(res.errMsg || '网络错误')
                }
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
        console.log(error)
        Message.error('网络错误')
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/404')
        } else if (code === 500) {
            redirect('/500')
        }
    })
}
