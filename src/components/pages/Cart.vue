<template>
  <div>
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
    // NOTE: Func - create 訂單
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
};
</script>
