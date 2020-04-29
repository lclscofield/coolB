export const state = () => ({
    userInfo: null // 用户数据
})

export const getters = {
    userInfo(state) {
        return state.userInfo
    }
}

export const mutations = {
    setUserInfo(state, params) {
        state.userInfo = params
    }
}

export const actions = {
    A_setUserInfo({ commit }, params) {
        commit('setUserInfo', params)
    }
}
