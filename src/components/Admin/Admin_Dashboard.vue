<template>
  <div>
    <!-- NOTE: component - "AdminNavber" -->
    <AdminNavber></AdminNavber>
    <!-- NOTE: component - "Alert" -->
    <Alert></Alert>
    <div class="container-fluid">
      <div class="row">
        <!-- NOTE: component - "AdminSidebar" -->
        <AdminSidebar></AdminSidebar>
        <main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavber from '../Admin/Admin_Navber';
import AdminSidebar from './Admin_Sidebar';
import Alert from '../AlertMessage';

export default {
  components: {
    AdminNavber,
    AdminSidebar,
    Alert,
  },
  created() {
    // NOTE: func - login token
    // * 送出 token 給後端
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = myCookie;
  },
};
</script>
