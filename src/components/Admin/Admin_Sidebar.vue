<template>
  <div>
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <h5 class="nav-link" href="#">
              <span data-feather="home"></span>
              管理項目 <span class="sr-only">(current)</span>
            </h5>
          </li>
          <li class="nav-item" @click="sidebarState = 'products'">
            <router-link class="nav-link" :class="{ 'active': sidebarState === 'products' }"
              to="/admin/products">
              <i class="fa-solid fa-box-open"></i>
              商品一覽
            </router-link>
          </li>
          <li class="nav-item" @click="sidebarState = 'coupon'">
            <router-link class="nav-link" :class="{ 'active': sidebarState === 'coupon' }"
              to="/admin/coupon">
              <i class="fa-solid fa-barcode"></i>
              優惠碼一覽
            </router-link>
          </li>
          <li class="nav-item" @click="sidebarState = 'orders'">
            <router-link class="nav-link" :class="{ 'active': sidebarState === 'orders' }"
              to="/admin/orders">
              <i class="fa-regular fa-file-lines"></i>
              訂單一覽
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarState: '',
    };
  },
};
</script>
