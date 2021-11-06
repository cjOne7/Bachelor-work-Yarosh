import Vue from 'vue';
import App from '@/App.vue';
import routes from "@/router/routes";
import {BootstrapVue} from 'bootstrap-vue';
import store from '@/store/index';
import moment from "moment";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

Vue.filter('checkForEmpty', value => value === '' ? '-' : value);
Vue.filter('dateFormatter', value => moment(value).format('DD.MM.YYYY HH:mm'));

new Vue({
    store: store,
    router: routes,
    render: h => h(App),
}).$mount('#app');
