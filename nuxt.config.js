module.exports = {
    appName: 'CoolBa',
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#00c58e'
    },
    /*
     ** Global CSS
     */
    css: [
        // 引入 ui css
        // 'ant-design-vue/dist/antd.less',
        'ant-design-vue/lib/button/style',
        'ant-design-vue/lib/back-top/style',
        'ant-design-vue/lib/divider/style',
        'ant-design-vue/lib/modal/style',
        'ant-design-vue/lib/form-model/style',
        'ant-design-vue/lib/icon/style',
        'ant-design-vue/lib/input/style',
        'ant-design-vue/lib/avatar/style',
        'ant-design-vue/lib/message/style'
    ],
    /*
     ** Plugins to load before mounting the App 插件在进入页面前加载
     */
    plugins: [
        // antd ui 库
        '@/plugins/antd_ui',
        // axios 扩展
        '@/plugins/axios'
    ],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        // baseURL: 'http://127.0.0.1:3000',
        prefix: '/api'
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        loaders: {
            less: {
                javascriptEnabled: true,
                // antd 定制主题
                modifyVars: {
                    '@primary-color': '#1890ff', // 全局主色
                    '@link-color': '#1890ff', // 链接色
                    '@success-color': '#52c41a', // 成功色
                    '@warning-color': '#faad14', // 警告色
                    '@error-color': '#f5222d', // 错误色
                    '@font-size-base': '14px', // 主字号
                    '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
                    '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
                    '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
                    '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
                    '@border-radius-base': '4px', // 组件/浮层圆角
                    '@border-color-base': '#d9d9d9', // 边框色
                    '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)' // 浮层阴影
                }
            }
        },
        extend(config, ctx) {}
    },
    /**
     * mongo 数据库配置
     */
    mongoConfig: {
        db: 'mongodb://localhost:27017/coolba'
    }
}
