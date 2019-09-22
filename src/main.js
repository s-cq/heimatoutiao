import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from './utils/axios.config'
import Components from './components'

Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Components)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
