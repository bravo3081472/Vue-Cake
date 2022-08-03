<template>
  <div>
    <div class="text-right mt-5">
      <button class="btn btn-primary my-3" @click="OpenCouponModal(true)">新增優惠碼</button>
    </div>
    <table class="table">
      <thead>
        <th>標題</th>
        <th>優惠百分比</th>
        <th>到期日</th>
        <th>優惠碼</th>
      </thead>
      <tbody>
        <tr v-for="(item, key) in Coupons" :key=key>
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>
            {{ `${new Date(item.due_date).getFullYear()} /
            ${new Date(item.due_date).getMonth()+1} /
            ${new Date(item.due_date).getDate()}` }}
          </td>
          <td>{{ item.code }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="OpenCouponModal(false, item)">
              <i class="fa-solid fa-pen-to-square"></i> 編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="DataBehavior('Del', item.id)">
              <i class="fa-solid fa-trash-can"></i> 刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="CouponModal" tabindex="-1" role="dialog"
      aria-labelledby="CouponModal" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="CouponModal">新增優惠碼</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title" v-model="Coupon.title"
                  placeholder="請輸入標題">
              </div>
              <div class="form-group">
                <label for="percent">優惠百分比</label>
                <input type="text" class="form-control" id="percent" v-model="Coupon.percent"
                  placeholder="請輸入優惠百分比">
              </div>
              <div class="form-group">
                <label for="code">優惠碼</label>
                <input type="text" class="form-control" id="code" v-model="Coupon.code"
                  placeholder="請輸入優惠碼">
              </div>
              <div class="form-group">
                <label for="due_date">到期日</label>
                <input type="date" id="due_date" v-model="Coupon.due_date">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="Coupon.is_enabled"
                    :true-value="1" :false-value="0" id="is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button v-if="status.modalBehaviorToggle === 'Add'" type="button"
                  class="btn btn-primary" @click="DataBehavior('Add')">確認新增</button>
                <button v-if="status.modalBehaviorToggle === 'Edit'" type="button"
                  class="btn btn-primary" @click="DataBehavior('Edit')">更改資料</button>
              </div>
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
      Coupons: [],
      Coupon: {},
      isLoading: false,
      isNew: false,
      status: {
        modalBehaviorToggle: '',
      },
    };
  },
  methods: {
    OpenCouponModal(isNew, item) {
      if (isNew) {
        this.Coupon = {};
        this.isNew = true;
        this.status.modalBehaviorToggle = 'Add';
      } else {
        this.Coupon = Object.assign({}, item);
        // 時間單位轉換 毫秒 轉換 2022-8-2 字串
        this.Coupon.due_date = new Date(item.due_date).toISOString().slice(0, 10);
        this.isNew = false;
        this.status.modalBehaviorToggle = 'Edit';
      }
      $('#CouponModal').modal('show');
    },
    /**
     * 資料行為
     * @function
     * @param dataBehaviorTrigger {String} - 用於觸發哪種資料行為
     * @param delCouponId {String} - 刪除哪筆 ID
     */
    DataBehavior(dataBehaviorTrigger, delCouponId) {
      let api;
      let httpMethod;
      const vm = this;
      const newCoupon = {
        title: vm.Coupon.title,
        is_enabled: vm.Coupon.is_enabled,
        percent: Number(vm.Coupon.percent),
        due_date: Date.parse(vm.Coupon.due_date),
        code: vm.Coupon.code,
      };
      switch (dataBehaviorTrigger) {
        case 'Add':
          api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/coupon`;
          httpMethod = 'post';
          break;
        case 'Edit':
          api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/coupon/${vm.Coupon.id}`;
          httpMethod = 'put';
          break;
        case 'Del':
          api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/coupon/${delCouponId}`;
          httpMethod = 'delete';
          break;
        default:
          break;
      }
      this.$http[httpMethod](api, { data: newCoupon }).then((response) => {
        console.log(response.data);
        $('#CouponModal').modal('hide');
        vm.Coupons = response.data.coupons;
        this.GetCoupons();
      });
    },
    GetCoupons() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/coupons?page=:page`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.Coupons = response.data.coupons;
      });
    },
    DelCoupon(CouponId) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/coupon/${CouponId}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        this.GetCoupons();
      });
    },
  },
  created() {
    this.GetCoupons();
  },
};
</script>
