import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import router from './router/router'
import 'vant/lib/index.css';
import './js/rem.js';
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
