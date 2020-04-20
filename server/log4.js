const path = require('path')
const log4 = require('koa-log4')

log4.configure({
    appenders: {
        access: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log', // 生成文件的规则
            filename: path.join('./logs/', 'access.log') // 生成文件名
        },
        application: {
            type: 'dateFile',
            pattern: '-yyyy-MM-dd.log',
            filename: path.join('./logs/', 'application.log')
        },
        out: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['out'], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application'], level: 'WARN' }
    }
})

exports.accessLogger = () => log4.koaLogger(log4.getLogger('access')) // 记录所有访问级别的日志
exports.logger = log4.getLogger('application') // 记录所有应用级别的日志
