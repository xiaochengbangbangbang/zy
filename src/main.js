import Vue from 'vue'
import App from './App.vue'
import "../public/css/index.css"
import "./config/utils"
import * as echarts from "echarts"
import "lib-flexible"

// 绑定在vue的原型对象上
Vue.prototype.$echarts = echarts
import MyEcharts from "./components/MyEcharts"
Vue.component("MyEcharts", MyEcharts)
// 关闭生产提示
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#root')
