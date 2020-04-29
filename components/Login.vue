<template>
    <a-modal
        :title="titles[modalType]"
        :visible="showModal"
        :confirmLoading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <div class="login"></div>
    </a-modal>
</template>

<script>
export default {
    name: 'Login',

    props: {
        modalType: {
            type: String,
            default: 'login'
        },
        showModal: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            confirmLoading: false,
            titles: {
                login: '登录',
                register: '注册'
            }
        }
    },

    methods: {
        // 弹窗确认
        handleOk() {
            this.$emit('hideModal')
        },

        // 弹窗取消
        handleCancel() {
            this.$emit('hideModal')
        }
    }
}
</script>

<style lang="less" scoped></style>
