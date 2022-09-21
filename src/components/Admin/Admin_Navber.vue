<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">管理系統</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="navbarCollapse">
          <!-- width > 768px -->
          <div class="ml-auto toggle-show">
            <button class="btn btn-outline-success" type="submit" @click="logout">
              登出
            </button>
          </div>
          <!-- width < 767px -->
          <div class="toggle-hide">
            <router-link class="btn ml-auto btn-outline-success m-2"
              to="/admin/products">
              <i class="fa-solid fa-box-open"></i>
              商品一覽
            </router-link>
            <router-link class="btn ml-auto btn-outline-success m-2"
              to="/admin/coupon">
              <i class="fa-solid fa-barcode"></i>
              優惠碼一覽
            </router-link>
            <router-link class="btn ml-auto btn-outline-success m-2"
              to="/admin/orders">
              <i class="fa-regular fa-file-lines"></i>
              訂單一覽
            </router-link>
            <button class="btn ml-auto btn-outline-success" type="submit" @click="logout">
              登出
            </button>
          </div>

        </div>

      </nav>
    </header>
  </div>
</template>

<script>
export default {
  methods: {
    // NOTE: func - Sign out
    logout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
