import './assets/css/main.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueSweetalert2 from 'vue-sweetalert2'
import VueTheMask from 'vue-the-mask'


Vue.use(VueSweetalert2);
Vue.use(VueTheMask)
Vue.config.productionTip = false

router.beforeEach((to,from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  }
  else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})