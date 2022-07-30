import Vue from 'vue';
import Router from 'vue-router';

// User
import Login from '@/components/pages/Login';
import Index from '@/components/CakeIndex';
// import Featurettes from '@/component/pages/Featurettes';
import CostomerOrders from '@/components/pages/CostomerOrders';

import Coupon from '@/components/pages/Coupon';

// Admin
import AdminDashboard from '@/components/Admin/Admin_Dashboard';
import Products from '@/components/Admin/pages/Products';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: false },
      children: [
        {
          path: '/CostomerOrders',
          name: 'CostomerOrders',
          component: CostomerOrders,
          meta: { requiresAuth: false },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/Coupon',
      name: 'Coupon',
      component: Coupon,
      meta: { requiresAuth: false },
    },
    {
      path: '/admin',
      name: 'Admin_Dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'Products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
