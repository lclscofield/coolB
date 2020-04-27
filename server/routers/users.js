// 用户相关路由
const Router = require('koa-router')
const usersController = require('../controllers/users')

const router = new Router()

const routers = router
    .post('/register', usersController.register) // 注册
    .post('/login', usersController.login) // 登录
    .post('/sendEmailCode', usersController.sendEmailCode) // 发送邮件验证码

module.exports = routers.routes()
