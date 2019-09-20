import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import Components from './components'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Components)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
