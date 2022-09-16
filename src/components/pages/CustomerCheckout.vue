<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-sm-6">
        <h2 class="text-center mb-4">訂單建立成功</h2>
        <p class="h3 text-center">商品明細</p>
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key=item.id>
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }} / {{ item.product.unit }}</td>
              <td class="align-middle">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>
        <p class="h3 text-center">收件人明細</p>
        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>收件人姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else>付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger" @click="payOrder">確認付款去</button>
        </div>
        <div class="text-right">
          <router-link class="btn btn-primary" :to="{ name: 'CustomerOrders' }">
            返回購物
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
      },
      orderId: '',
    };
  },
  methods: {
    // NOTE: Func - Get API JSON Data{} order
    GetOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/order/${vm.orderId}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.order = response.data.order;
      });
    },
    // NOTE: Func - Pay order
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/pay/${vm.orderId}`;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.GetOrder();
          vm.$router.push('/cake-test/customerOrders');
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.GetOrder();
  },
};
</script>
