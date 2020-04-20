// 服务端 api 路由控制
const Router = require('koa-router')
const users = require('./users')

const router = new Router({
    prefix: '/api'
})

// api 接口
router.use('/users', users)

module.exports = router
