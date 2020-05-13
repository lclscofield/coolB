// 邮箱验证码数据存储
const emailCodes = {
    set(key, val) {
        this.map.set(key, val)
        setTimeout(() => {
            this.map.delete(key)
        }, 120000) // 120s 后过期自动清除
    },
    get(key) {
        return this.map.get(key)
    },
    map: new Map()
}

module.exports = emailCodes
