import Vue from 'vue';
import App from '@/App.vue';
import routes from "@/router/routes";
import {BootstrapVue} from 'bootstrap-vue';
import store from '@/store/index';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store: store,
  router: routes,
  render: h => h(App),
}).$mount('#app');
