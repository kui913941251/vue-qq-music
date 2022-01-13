import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/style/iconfont.css";
import "./assets/style/normalize.css"
import 'lib-flexible'

Vue.config.productionTip = false

import eventBus from './utils/eventBus'
Vue.prototype.$eventBus = eventBus


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
