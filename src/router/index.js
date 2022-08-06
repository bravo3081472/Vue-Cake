import Vue from 'vue';
import Router from 'vue-router';

// User
import Login from '@/components/pages/Login';
import Index from '@/components/CakeIndex';
import CostomerOrders from '@/components/pages/CostomerOrders';
import Cart from '@/components/pages/Cart';
import CostomerCheckout from '@/components/pages/CostomerCheckout';

// 未使用
// import Featurettes from '@/component/pages/Featurettes'; // 首頁廣告頁面

// Admin
import AdminDashboard from '@/components/Admin/Admin_Dashboard';
import Products from '@/components/Admin/pages/Products';
import Coupon from '@/components/Admin/pages/Coupon';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: '/',
    // },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: false },
      children: [
        {
          path: 'costomerOrders',
          name: 'CostomerOrders',
          component: CostomerOrders,
          meta: { requiresAuth: false },
        },
        {
          path: 'cart',
          name: 'Cart',
          component: Cart,
          meta: { requiresAuth: false },
        },
        {
          path: 'costomerCheckout/:orderId',
          name: 'CostomerCheckout',
          component: CostomerCheckout,
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
      path: '/admin',
      name: 'Admin_Dashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: { requiresAuth: false },
        },
      ],
    },
  ],
});
