import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/Login';
import Index from '@/components/CakeIndex';
import Coupon from '@/components/pages/Coupon';
import CostomerOrders from '@/components/pages/CostomerOrders';

import Admin from '@/components/Admin/Admin_Index';
import Products from '@/components/Admin/pages/Products';

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
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon,
    },
    {
      path: '/CostomerOrders',
      name: 'CostomerOrders',
      component: CostomerOrders,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: 'Products',
          name: 'Products',
          component: Products,
        },
      ],
    },
  ],
});
