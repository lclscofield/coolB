<template>
    <div class="layout-default">
        <!-- 主体 -->
        <nuxt />
        <!-- 返回顶部 -->
        <a-back-top />
    </div>
</template>

<style lang="less">
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
        sans-serif;
    font-size: 14px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

body {
    background-color: #f9f9f9;
}

/* *,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
} */

.layout-default {
    height: 5000px;
}
</style>
