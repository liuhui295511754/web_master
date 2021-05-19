import Vue from 'vue'

import 'normalize.css/normalize.css' // css初始化

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由配置
import filter from './filters/timeFilter';
import qs from 'qs'
Vue.prototype.$qs = qs

import components from './components/Mt/index'
Vue.use(components)

import moment from 'moment'; //时间格式化
moment.locale('zh-cn'); //设置语言 
Vue.prototype.$moment = moment;

Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * 目前MockJs将用于生产环境，
 * *请在上线前删除它!!!
 */
if (process.env.NODE_ENV === 'production') {}
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
