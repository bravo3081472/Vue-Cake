<template>
  <div>
    <header>
      <nav class="navbar navbar-expand bg-white fixed-top">
        <div class="container-fluid w-50 m-auto">
          <a class="navbar-brand logo" href="#">Cake Test</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">首頁 <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/CustomerOrders">商品一覽
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>

            </ul>
            <button class="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit"
              data-toggle="modal" data-target="#LoadModel">
              登入
            </button>
          </div>

        </div>
      </nav>
    </header>

    <!-- NOTE: component - LoadModal 登入功能 -->
    <LoadModal></LoadModal>
  </div>
</template>

<script>
import LoadModal from './LoadModal';

export default {
  components: {
    LoadModal,
  },
};
</script>

<style scoped>
/* NOTE: css */
.logo {
  font-size: 30px;
}
.nav-link {
  padding: 1.5em !important;
}
</style>
