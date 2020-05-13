<template>
    <header class="header">
        <div class="header-content">
            <div class="header-logo-wrap">
                <img src="~assets/cool.svg" alt="cool" class="header-logo" />
            </div>
            <div class="header-nav">
                <nuxt-link class="header-nav-item" to="/">首页</nuxt-link>
            </div>
            <div v-if="!userInfo" class="header-user">
                <span class="header-user-item" @click="showLoginModal(0)">登录</span>
                <a-divider type="vertical" />
                <span class="header-user-item" @click="showLoginModal(1)">注册</span>
            </div>
            <div v-else class="header-user flex">
                <span class="username">{{ userInfo.username }}</span>
                <img class="avatar" :src="userInfo.imgUrl" />
            </div>
        </div>
        <Login v-if="showModal" :modalType="modalType" :showModal="showModal" @hideModal="showModal = false"></Login>
    </header>
</template>

<script>
import { mapGetters } from 'vuex'

import Login from './Login'

export default {
    name: 'Header',

    components: {
        Login
    },

    data() {
        return {
            modalType: '',
            showModal: false
        }
    },

    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },

    methods: {
        // 打开弹窗
        showLoginModal(typeIdx) {
            const types = ['login', 'register']
            this.modalType = types[typeIdx]
            this.showModal = true
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    min-width: 1200px;
    font-size: 16px;
    background-color: #ffffff;
    box-shadow: 0px 1px 5px -1px #e4dede;

    > .header-content {
        height: 60px;
        line-height: 60px;
        width: 1200px;
        margin: 0 auto;
        display: flex;

        > .header-logo-wrap {
            padding: 0 20px;
            width: 100px;
            text-align: center;

            > .header-logo {
                width: 30px;
                height: 30px;
            }
        }

        > .header-nav {
            width: 800px;
            display: flex;

            > .header-nav-item {
                padding: 0 20px;
                cursor: pointer;
                color: rgba(0, 0, 0, 0.65);
            }
        }

        > .header-user {
            padding: 0 20px;
            width: 300px;
            text-align: right;

            > .header-user-item {
                color: @primary-color;
                cursor: pointer;
            }

            &.flex {
                display: flex;
            }

            > .username {
                display: inline-block;
                width: 180px;
                white-space: nowrap; /* 使文本不可换行 */
                overflow: hidden; /* 隐藏溢出部分 */
                text-overflow: ellipsis; /* 显示省略符号来代表被隐藏的文本 */
            }

            > .avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-left: 10px;
            }
        }
    }
}
</style>
