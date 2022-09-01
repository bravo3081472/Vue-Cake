<template>
  <div>
    <nav id="sidebarMenu" class="sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link active" to="/CustomerOrders">商品一覽
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Cart">
              購物車
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/*
  * Sidebar
  */

.sidebar {
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(500px - 48px);
  padding-top: 0.5rem;
  text-align: center;
}
.nav {
  padding: 0 20px;
}
.nav-item {
  margin: 5px 0;
  border: 1px solid #000;
}
</style>
