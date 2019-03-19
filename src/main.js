import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import Axios from 'axios';
import router from './router/router';
import 'vant/lib/index.css';
import './js/rem.js';
import './js/mock.js';

Vue.use(Vant);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
