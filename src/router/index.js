import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Index from '@/components/CakeIndex';

import Admin from '@/components/Admin/pages/Admin_Index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      // children: [
      //   {
      //     path: 'Admin_Index',
      //     name: 'Admin_Index',
      //     component: Admin,
      //   },
      // ],
    },
  ],
});
