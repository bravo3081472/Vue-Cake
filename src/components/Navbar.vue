<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light avoid-scrollbar-push">
        <div class="container-md">
          <router-link class="navbar-brand logo" to="/cake-test">Cake Test
            <span class="sr-only">(current)</span>
          </router-link>

          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item" :class="{ 'active': state === 'index' }"
                @click="state = 'index'">
                <router-link class="nav-link" to="/cake-test">首頁
                  <span class="sr-only">(current)</span>
                </router-link>
              </li>
              <li class="nav-item" :class="{ 'active': state === 'CustomerOrders' }"
                @click="state = 'CustomerOrders'">
                <router-link class="nav-link" :to="{ name: 'CustomerOrders' }">商品一覽
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
  data() {
    return {
      state: 'index',
    };
  },
};
</script>

