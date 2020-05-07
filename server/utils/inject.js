const userModel = require('../models/users')

// 向页面注入数据
module.exports = async ctx => {
    const accept = ctx.header.accept.split(',') || []

    // 请求文档才注入数据
    if (accept.includes('text/html')) {
        const pageData = {}

        // 登录态时注入用户数据
        if (ctx.session.logged) {
            const doc = await userModel.getUserInfo(ctx.session.id)
            doc &&
                (pageData.userInfo = {
                    ...doc.toJSON()
                })
        }

        ctx.res.pageData = pageData
    }
}
