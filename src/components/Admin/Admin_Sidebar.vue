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

<style scoped>
/* NOTE: css */
/*
  * Sidebar
  */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link i {
  width: 1rem;
  height: 1rem;
  padding-right: 1.5rem;
}

.sidebar .nav-link.active {
  color: #007bff;
}

/* .sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
} */

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
