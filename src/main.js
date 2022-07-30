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

// 單位符號
Vue.filter('currency', currencyFilter);

// 讀取畫面
Vue.component('Loading', Vueloading);

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

// Axios
Vue.use(Vueaxion, axios);

// 路由阻擋
router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/Login',
        });
      }
    });
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
