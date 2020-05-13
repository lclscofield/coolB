<template>
    <a-modal :title="titles[type]" :visible="showModal" :footer="null" @cancel="handleCancel">
        <!-- 登录表单 -->
        <a-form-model
            v-if="type === 'login'"
            ref="loginRuleForm"
            :model="loginData"
            :rules="loginRules"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            @submit="handleSubmitLogin"
            @submit.native.prevent
        >
            <!-- 账号 -->
            <a-form-model-item label="账号" prop="account">
                <a-input v-model="loginData.account" :placeholder="loginPlaceholder.accountPlaceholder">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 密码 -->
            <a-form-model-item label="密码" prop="password">
                <a-input
                    v-model="loginData.password"
                    type="password"
                    :placeholder="loginPlaceholder.accountPlaceholder"
                >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 登录按钮 -->
            <a-form-model-item class="btn-click-wrap" :labelCol="labelCol">
                <a-button
                    class="btn-click"
                    type="primary"
                    htmlType="submit"
                    :disabled="isLoginDisabled"
                    :loading="confirmLoading"
                >
                    登录
                </a-button>
                <span class="btn-other" @click="switchType('register')">注册>></span>
            </a-form-model-item>
        </a-form-model>

        <!-- 注册表单 -->
        <a-form-model
            v-if="type === 'register'"
            ref="registerRuleForm"
            :model="registerData"
            :rules="registerRules"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            @submit="handleSubmitRegister"
            @submit.native.prevent
        >
            <!-- 用户名 -->
            <a-form-model-item label="用户名" prop="username">
                <a-input v-model="registerData.username" :placeholder="registerPlaceholder.usernamePlaceholder">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 密码 -->
            <a-form-model-item label="密码" prop="password">
                <a-input
                    v-model="registerData.password"
                    type="password"
                    :placeholder="registerPlaceholder.accountPlaceholder"
                >
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <!-- 邮箱 -->
            <a-form-model-item label="邮箱" prop="email">
                <a-input v-model="registerData.email" :placeholder="registerPlaceholder.emailPlaceholder">
                    <a-icon slot="prefix" type="mail" style="color:rgba(0,0,0,.25)" />
                </a-input>
                <a-button
                    class="btn-click"
                    type="primary"
                    :disabled="registerData.email === '' || sendEmailCodeNum > 0"
                    @click="sendEmailCode"
                >
                    {{ sendEmailCodeNum > 0 ? sendEmailCodeNum + 's' : '发送验证码' }}
                </a-button>
            </a-form-model-item>
            <!-- 验证码 -->
            <a-form-model-item label="验证码" prop="code">
                <a-input v-model="registerData.code"></a-input>
            </a-form-model-item>
            <!-- 登录按钮 -->
            <a-form-model-item class="btn-click-wrap" :labelCol="labelCol">
                <a-button
                    class="btn-click"
                    type="primary"
                    htmlType="submit"
                    :disabled="isRegisterDisabled"
                    :loading="confirmLoading"
                >
                    注册
                </a-button>
                <span class="btn-other" @click="switchType('login')">登录>></span>
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
            type: '', // 登录或注册类型
            confirmLoading: false, // 登录或者注册中按钮加载状态
            sendEmailCodeNum: 0, // 发送验证码倒计时
            messageId: '', // 每次发送邮件时的唯一验证 id
            titles: {
                login: '登录',
                register: '注册'
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            // 登录表单数据
            loginData: {
                account: '',
                password: ''
            },
            // 登录字段提示
            loginPlaceholder: {
                accountPlaceholder: '请输入用户名/邮箱',
                passwordPlaceholder: '请输入密码'
            },
            // 登录表单验证规则
            loginRules: {
                account: [
                    {
                        required: true,
                        message: '请输入用户名/邮箱',
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
                        message: '请输入6~30位的大小写字母或数字',
                        trigger: 'blur'
                    }
                ]
            },
            // 注册表单数据
            registerData: {
                username: '',
                password: '',
                email: '',
                code: ''
            },
            // 注册字段提示
            registerPlaceholder: {
                usernamePlaceholder: '请输入1~20位的用户名',
                passwordPlaceholder: '请输入6~30位的大小写字母或数字',
                emailPlaceholder: '请输入邮箱'
            },
            // 注册表单验证规则
            registerRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 1,
                        max: 20,
                        message: '请输入1~20位的用户名',
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
                        message: '请输入6~30位的大小写字母或数字',
                        trigger: 'blur'
                    }
                ],
                email: [
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }
                ],
                code: [
                    {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),

        isLoginDisabled() {
            const { account, password } = this.loginData
            return account === '' || password === ''
        },

        isRegisterDisabled() {
            const { username, password, email, code } = this.registerData
            return username === '' || password === '' || email === '' || code === ''
        }
    },

    created() {
        this.switchType(this.modalType)
    },

    methods: {
        ...mapActions(['A_setUserInfo']),

        // 切换类型
        switchType(type) {
            this.type = type
        },

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
        },

        // 发送邮箱验证码
        async sendEmailCode() {
            const res = await this.$api.fetch_sendEmailCode(this.registerData.email)
            if (res && res.messageId) {
                this.messageId = res.messageId
                this.sendEmailCodeNum = 60
                const timer = setInterval(() => {
                    this.sendEmailCodeNum--
                    if (this.sendEmailCodeNum === 0) {
                        clearInterval(timer)
                    }
                }, 1000)
            }
        },

        // 注册提交
        async handleSubmitRegister() {
            if (!this.validate('registerRuleForm')) return

            this.confirmLoading = true
            const res = await this.$api.fetch_register({
                ...this.registerData,
                messageId: this.messageId
            })

            res && this.$emit('hideModal')
            this.confirmLoading = false
        }
    }
}
</script>

<style lang="less" scoped>
.btn-click-wrap {
    text-align: right;

    /deep/ .btn-other {
        padding-left: 10px;
        color: @primary-color;
        cursor: pointer;
    }
}
</style>
