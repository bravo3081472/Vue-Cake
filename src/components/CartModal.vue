<template>
  <div>
    <div class="modal fade" id="CartModal" tabindex="-1" role="dialog" aria-labelledby="CartModal"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary">
            <h5 class="modal-title modal_header_title">購物車</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pt-0">
            <!-- NOTE: Component - "loading" -->
            <loading :active.sync="isLoading"></loading>
            <table class="table">
              <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th class="text-right">單價</th>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key=item.id>
                  <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-sm"
                      @click="DelCart(item.id)">
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                  <td class="align-middle">
                    {{ item.product.title }}
                    <div class="text-success"
                      v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="align-middle">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="align-middle text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right">總計</td>
                  <td class="text-right">
                    {{ cart.total | currency }}
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-right text-success">折扣價</td>
                  <td class="text-right text-success">
                    {{ cart.final_total | currency }}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm w-75 mx-auto">
              <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="AddCouponCode">
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="row">
              <button class="btn btn-outline-primary w-50 mx-auto" type="button" @click="ToCart">
                確認
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      cart: [],
      isLoading: false,
      couponCode: '',

    };
  },
  methods: {
    // NOTE: Func - Get JSON API Data[] cart
    GetCart() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log('GetCart', response.data);
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    // NOTE: Func - add 單一 優惠碼
    AddCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/coupon`;
      const vm = this;
      const coupon = {
        code: vm.couponCode,
      };
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log('AddCouponCode', response.data);
        this.GetCart();
      });
    },
    // NOTE: Func - delete 單一 購物車品項
    DelCart(delId) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/cart/${delId}`;
      this.$http.delete(api).then((response) => {
        console.log('DelCart', response.data);
        this.GetCart();
      });
    },
    ToCart() {
      $('#CartModal').modal('hide');
      this.$router.push('/cake-test/Cart');
    },
  },
  created() {
    this.GetCart();
    this.$bus.$on('GetCart', () => { this.GetCart(); });
  },
};
</script>

<style lang="scss" scoped>
.modal_header_title {
  width: 100px;
  margin: auto;
  color: #fff;
  & + button {
    position: absolute;
    right: 1rem;
  }
}
</style>
