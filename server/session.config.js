module.exports = {
    key: 'sessionId', // (string) cookie key
    maxAge: 86400000, // (boolean) 默认一天过期
    autoCommit: true, // (boolean) 自动提交头部
    overwrite: true, // (boolean) 能否被覆盖
    httpOnly: true, // (boolean) 是否打上 httpOnly
    signed: true, // (boolean) 是否加签
    rolling: true, // (boolean) 是否每次响应时刷新 session 的有效期
    renew: false, // (boolean) 是否在 session 快过期时刷新 session 的有效期
    secure: false, // (boolean) 安全 cookie
    sameSite: null // (string) session cookie sameSite options (default null, don't set it)
}
