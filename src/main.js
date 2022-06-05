import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080';

Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#q-app')