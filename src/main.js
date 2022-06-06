/* eslint-disable import/first */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vueaxion from 'vue-axios';
import 'bootstrap';

import Vueloading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import './bus';
import currencyFilter from './filters/currency';

Vue.filter('currency', currencyFilter);

Vue.component('Loading', Vueloading);

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

Vue.use(Vueaxion, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
