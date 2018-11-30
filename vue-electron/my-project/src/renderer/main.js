import Vue from 'vue'

//import 'normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'
import '@/icons' // icon
import '@/permission' // permission control
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.use(ElementUI)

Vue.config.productionTip = false
let vm = new Vue({
	el:"#app",
	router,
	store,
	render: h => h(App)
})
