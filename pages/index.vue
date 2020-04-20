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
import Header from '@/components/Header'

export default {
    name: 'Home',

    components: {
        Header
    },

    // 异步获取数据
    asyncData({ $axios }) {
        // console.log(111)
    },

    mounted() {
        console.log(process)
        // this.$api.register()
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
