<template>
  <div>
    <!-- NOTE: 讀取畫面 -->
    <loading :active.sync="isLoading"></loading>

    <table class="table">
      <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key=item.id>
          <td class="align-middle">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="DelCart(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="align-middle text-right">{{ item.final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="AddCouponCode">
          套用優惠碼
        </button>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="CreateOrder">
            <validation-provider rules="required|email" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" name="Email" v-model="form.user.email"
                  class="form-control" :class="classes" placeholder="請輸入email">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="text">收件人姓名</label>
                <input type="text" name="收件人姓名" v-model="form.user.name" class="form-control"
                  :class="classes" placeholder="請輸入收件人姓名">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="text">收件人電話</label>
                <input type="text" name="收件人電話" v-model="form.user.tel" class="form-control"
                  :class="classes" placeholder="請輸入收件人電話">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="form-group">
                <label for="text">收件人地址</label>
                <input type="text" name="收件人地址" v-model="form.user.address" class="form-control"
                  :class="classes" placeholder="請輸入收件人地址">
                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>

            <div class="form-group">
              <label for="comment">留言</label>
              <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                v-model="form.user.message"></textarea>
            </div>
            <div class="text-right">
              <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
            </div>
          </form>
        </validation-observer>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      isLoading: false,
      couponCode: '',
      form: {
        user: {
          name: '',
          email: '',
          address: '',
          tel: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // NOTE: 取得訂單
    GetCart() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    // NOTE: 加入優惠碼
    AddCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.couponCode,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log(response.data);
        this.GetCart();
      });
    },
    // NOTE: 刪除訂單
    DelCart(delId) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/cart/${delId}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        this.GetCart();
      });
    },
    CreateOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/order`;
      const vm = this;
      const order = vm.form;
      this.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.$router.push(`customerCheckout/${response.data.orderId}`);
      });
    },
  },
  created() {
    this.GetCart();
  },
};
</script>
