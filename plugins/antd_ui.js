import Vue from 'vue'

// 按需引入
import Button from 'ant-design-vue/lib/button' // 按钮
import BackTop from 'ant-design-vue/lib/back-top' // 回到顶部
import Divider from 'ant-design-vue/lib/divider' // 分割线
import Modal from 'ant-design-vue/lib/modal' // 弹窗
import FormModel from 'ant-design-vue/lib/form-model' // 表单
import Icon from 'ant-design-vue/lib/icon' // 图标
import Input from 'ant-design-vue/lib/input' // 输入框
import Avatar from 'ant-design-vue/lib/avatar' // 头像
import Message from 'ant-design-vue/lib/message' // 全局提示

// 导入 vue
Vue.use(Button)
Vue.use(BackTop)
Vue.use(Divider)
Vue.use(Modal)
Vue.use(FormModel)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Avatar)
Vue.prototype.$message = Message
