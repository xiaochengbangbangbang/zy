import Vue from 'vue'
import App from './App.vue'
import "../public/css/index.css"
import "./config/utils"
import * as echarts from "echarts"
import "lib-flexible"
import {Service} from '@/utils/request.js'
import dataV from '@jiaminghi/data-view'
import vueSeamlessScroll from 'vue-seamless-scroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'echarts/map/js/china.js'

Vue.use(vueSeamlessScroll)
Vue.use(ElementUI)
Vue.prototype.$axios=Service

Vue.use(dataV)
// 绑定在vue的原型对象上
Vue.prototype.$echarts = echarts

import MyEcharts from "./components/MyEcharts"
Vue.component("MyEcharts", MyEcharts)
// 关闭生产提示
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#root')
