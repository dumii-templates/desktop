// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/view/theme/default.less'
import utils from '@/utils'
import auth from '@/utils/auth'
import http from '@/utils/http'
import browser from '@/utils/browser'
import moment from 'moment'

Vue.use(iView)

Vue.prototype.$auth = auth
Vue.prototype.$utils = utils
Vue.prototype.$http = http
Vue.prototype.$browser = browser
Vue.prototype.$moment = moment

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
