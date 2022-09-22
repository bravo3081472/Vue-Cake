<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <!-- width > 768px -->
    <table class="table table-responsive-sm mt-5 toggle-show">
      <thead class="thead-dark">
        <tr>
          <th class="toggle-hide"></th>
          <th>建立時間</th>
          <th>訂單ID</th>
          <th>是否付款</th>
          <th>付款時間</th>
          <th width="150rem">訂單明細</th>
          <th>訂單總額</th>
          <th width="200rem">收件人資訊</th>
        </tr>
      </thead>
      <tbody>
        <tr :class="[item.is_paid ? 'list-group-item-success' : 'list-group-item-danger']"
          v-for="(item) in Orders" :key="item.id">
          <td>{{ item.create_at | dateConversion }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.is_paid ? "是" : "否" }}</td>
          <td v-if="item.is_paid === true">{{ item.paid_date | dateConversion}}</td>
          <td v-else></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(products, i) in item.products" :key="i">
                {{ products.product.title }} / {{ products.product.num }}
              </li>
            </ul>
          </td>
          <td>{{ item.total | currency }}</td>
          <td>
            <ul class="list-unstyled">
              <li>地址：{{ item.user.address }}</li>
              <li>email：{{ item.user.email }}</li>
              <li>留言：{{ item.user.message }}</li>
              <li>姓名：{{ item.user.name }}</li>
              <li>電話：{{ item.user.tel }}</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- width < 767px -->
    <div class="accordion toggle-hide" id="accordionExample">
      <div class="card mt-5">
        <div class="card-header">
          <div class="row">
            <div class="col">建立時間</div>
            <div class="col">訂單ID</div>
          </div>
        </div>
        <div class="list-group list-group-flush">
          <div class="list-group-item"
            :class="[item.is_paid ? 'list-group-item-success' : 'list-group-item-danger']"
            v-for="(item) in Orders" :key="item.id">

            <!-- collapsed toggle -->
            <div class="row collapsed align-items-center" data-toggle="collapse"
              :data-target="`#${item.id}`" aria-expanded="false" aria-controls="collapseTwo">
              <div class="col-4 p-0">
                <button class="btn btn-link d-inline p-0" type="button">
                  <i class="fa-solid fa-angle-down"></i>
                </button>
                {{ item.create_at | dateConversion }}
              </div>
              <div class="col">{{ item.id }}</div>

              <!-- collapsed content -->
              <div :id="`${item.id}`" class="container bg-light collapse"
                aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="row">
                  <div class="col">是否付款：{{ item.is_paid ? "是" : "否" }}</div>
                  <div class="col-7" v-if="item.is_paid === true">
                    付款時間：{{ item.paid_date | dateConversion }}
                  </div>
                  <div class="col-7" v-else></div>
                </div>
                <div class="row">
                  <ul class="col list-unstyled">
                    訂單明細：
                    <li v-for="(products, i) in item.products" :key="i">
                      {{ products.product.title }} / {{ products.product.num }}
                    </li>
                    <li>訂單總額：{{ item.total | currency }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      Orders: [],
      isLoading: false,
    };
  },
  methods: {
    GetOrders() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/orders?page=:page`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data.orders[0].products["-NBqPPHImzGmQn3EfHdD"]);
        console.log(response.data);
        vm.Orders = response.data.orders;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.GetOrders();
  },
};
</script>

