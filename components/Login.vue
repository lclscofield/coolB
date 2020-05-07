<template>
    <a-modal :title="titles[modalType]" :visible="showModal" :footer="null" @cancel="handleCancel">
        <!-- login 表单 -->
        <a-form-model
            v-if="modalType === 'login'"
            ref="loginRuleForm"
            :model="loginData"
            :rules="rulesLogin"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            @submit="handleSubmitLogin"
            @submit.native.prevent
        >
            <!-- 账号 -->
            <a-form-model-item label="账号" prop="account">
                <a-input v-model="loginData.account" :placeholder="loginData.accountPlaceholder">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 密码 -->
            <a-form-model-item label="密码" prop="password">
                <a-input v-model="loginData.password" type="password" :placeholder="loginData.accountPlaceholder">
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 登录按钮 -->
            <a-form-model-item class="btn-click-wrap" :labelCol="labelCol">
                <a-button
                    class="btn-click"
                    type="primary"
                    htmlType="submit"
                    :disabled="loginData.account === '' || loginData.password === ''"
                    :loading="confirmLoading"
                >
                    {{ titles[modalType] }}
                </a-button>
                <span class="btn-ather">注册>></span>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            loginData: {
                account: '',
                accountPlaceholder: '用户名/邮箱',
                password: '',
                passwordPlaceholder: '6~30位大小写字母或数字'
            },
            rulesLogin: {
                account: [
                    {
                        required: true,
                        message: '请输入用户名或邮箱',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[a-zA-Z0-9]{6,30}$/,
                        message: '请输入6~30位大小写字母或数字',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },

    methods: {
        ...mapActions(['A_setUserInfo']),
        // 弹窗关闭
        handleCancel() {
            this.$emit('hideModal')
        },

        // 验证规则
        validate(formType) {
            let validVal = false
            this.$refs[formType].validate(valid => {
                validVal = valid
            })
            return validVal
        },

        // 登录提交
        async handleSubmitLogin() {
            if (!this.validate('loginRuleForm')) return

            this.confirmLoading = true
            await this.A_setUserInfo(this.loginData)

            this.userInfo && this.$emit('hideModal')
            this.confirmLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.btn-click-wrap {
    text-align: right;

    /deep/ .btn-ather {
        padding-left: 10px;
        color: @primary-color;
        cursor: pointer;
    }
}
</style>
