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
        'ant-design-vue/lib/divider/style'
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
                    'primary-color': '#00c58e'
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
