<template>
  <div>
    <nav id="sidebarMenu" class="d-md-block bg-light sidebar collapse">
      <div class="sidebar-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">
              商品一覽 <span class="sr-only">(current)</span>
            </a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">
              芒果季限定
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              蛋糕系列
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              冷藏甜點
            </a>
          </li> -->
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
  /* position: fixed;
  top: 0;
  bottom: 0;
  left: 0; */
  z-index: 100;
  padding: 48px 0 0;
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
  height: calc(500px - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
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

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}
</style>
