<template>
  <div>
    <table class="table">
      <thead>
        <th>標題</th>
        <th>優惠百分比</th>
        <th>到期日</th>
        <th>優惠碼</th>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Coupons: [],
    };
  },
  methods: {
    getCoupons() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/orders?page=:page`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
