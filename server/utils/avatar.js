const Identicon = require('identicon.js')
const { createHash } = require('./utils')

module.exports = {
    /**
     * 生成哈希头像
     * @param {string} str
     */
    creatHashAvatar(str) {
        const imgData = new Identicon(createHash(str)).toString()
        const imgUrl = 'data:image/png;base64,' + imgData // 这就是头像的base64码
        return imgUrl
    }
}
