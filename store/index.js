export const state = () => ({
    userInfo: null // 用户数据
})

export const getters = {
    getUserInfo(state) {
        return state.userInfo
    }
}

export const mutations = {
    setUserInfo(state, params) {
        state.userInfo = params
    }
}

export const actions = {
    async A_setUserInfo({ commit }, loginData) {
        const { account, password } = loginData
        const res = await this.$api.fetch_login({
            account,
            password
        })
        res && commit('setUserInfo', res)
    }
}
