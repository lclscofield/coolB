<template>
    <header class="header">
        <div class="header-content">
            <div class="header-logo-wrap">
                <img src="~assets/cool.svg" alt="cool" class="header-logo" />
            </div>
            <div class="header-nav">
                <nuxt-link class="header-nav-item" to="/">首页</nuxt-link>
            </div>
            <div class="header-user">
                <span>登录</span>
                <a-divider type="vertical" />
                <span>注册</span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',

    methods: {}
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

            > span {
                color: @primary-color;
                cursor: pointer;
            }
        }
    }
}
</style>
