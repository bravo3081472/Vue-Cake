<template>
  <div>
    <AdminNavber></AdminNavber>
    <AdminSideber></AdminSideber>
  </div>
</template>

<script>
import AdminNavber from '../../Admin/Admin_Navber';
import AdminSideber from '../Admin_Sideber';

export default {
  components: {
    AdminNavber,
    AdminSideber,
  },
};
</script>
