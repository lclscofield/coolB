const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')

const config = require('../nuxt.config.js')
const routers = require('./routers/index')

// 日志记录
const { logger, accessLogger } = require('./log4')

const app = new Koa()

// Import and Set Nuxt.js options
config.dev = app.env !== 'production'

async function start() {
    // Instantiate nuxt.js
    const nuxt = new Nuxt(config)

    const {
        host = process.env.HOST || '127.0.0.1',
        port = process.env.PORT || 3000
    } = nuxt.options.server

    await nuxt.ready()
    // Build in development
    // dev 环境需要 build
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    // 连接数据库
    const mongoConfig = config.mongoConfig
    mongoose.connect(mongoConfig.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = mongoose.connection
    // 连接成功
    db.on('connected', () => {
        console.log(mongoConfig.db + '连接成功')
    })
    // 连接失败
    db.on('error', () => {
        console.log(mongoConfig.db + '连接失败')
    })

    // 记录所有访问
    app.use(accessLogger())

    // 初始化路由中间件
    app.use(routers.routes()).use(routers.allowedMethods())

    // nuxt 渲染
    app.use(ctx => {
        ctx.status = 200
        ctx.respond = false // Bypass Koa's built-in response handling
        ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
        nuxt.render(ctx.req, ctx.res)
    })

    app.listen(port, host)
    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })

    app.on('error', err => {
        logger.error(err)
    })
}

start()
