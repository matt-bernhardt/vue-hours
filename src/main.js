import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

var hoursStore = {
  debug: true,
  state: {
    status: 'Initializing'
  },
  setStatus (newStatus) {
    if (this.debug) console.log('status set to ', newStatus)
    this.state.status = newStatus
  },
  loadHours () {
    if (this.debug) console.log('loading hours from API')
    this.setStatus('Loading...')
  }
}

new Vue({
  router,
  data: hoursStore,
  render: h => h(App)
}).$mount('#app')
