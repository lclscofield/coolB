<template>
    <div class="home">
        <!-- <nuxt-link to="/about">about</nuxt-link> -->
        <!-- <a-button type="primary">Primary</a-button> -->
        <Header></Header>
        <div class="container-wrap">
            <div class="container">123</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import Header from '~/components/Header'

export default {
    name: 'Home',

    components: {
        Header
    },

    // 异步获取数据
    asyncData({ res }) {
        return {
            pageData: res.pageData || {}
        }
    },

    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },

    created() {
        // 在服务端注入用户信息
        if (process.server) {
            const { userInfo } = this.pageData || {}
            userInfo && this.setUserInfo(userInfo)
        }
    },

    mounted() {},

    methods: {
        ...mapMutations(['setUserInfo'])
    }
}
</script>

<style lang="less" scoped>
.container-wrap {
    min-width: 1200px;

    > .container {
        width: 1000px;
        margin: 10px auto;
        background-color: #ffffff;
        border-radius: 4px;
    }
}
</style>
