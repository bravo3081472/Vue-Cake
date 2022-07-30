<template>
  <div>
    <div class="row">
      <div class="col-md md-4" v-for="item in Products" :key=item.id>
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">內容</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">原價 {{ item.origin_price }} 元</del>
              <div class="h5">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="GetProduct(item.id)">
              <i class="fas fa-spinner fa-spin"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i class="fas fa-spinner fa-spin"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productsModalLabel"
      aria-hidden>
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="productModalLabel">{{ Product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="col-sm">
              <img alt="" class="img-fluid" :src="Product.imageUrl">
              <p class="text">{{ Product.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <del class="h6">原價 {{ Product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ Product.price }} 元</div>
              </div>
              <div class="form-group">
                <select name="" id="exampleFormControlSelect1" class="form-control">
                  <option>選購 1 件</option>
                  <option>選購 2 件</option>
                  <option>選購 3 件</option>
                  <option>選購 4 件</option>
                  <option>選購 5 件</option>
                </select>
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
      Products: [],
      Product: {},
    };
  },
  methods: {
    GetProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/products?page=:page`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.Products = response.data.products;
      });
    },
    GetProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/product/${id}`;
      const vm = this;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.Product = response.data.product;
        $('#productModal').modal('show');
      });
    },
  },
  created() {
    this.GetProducts();
  },
};
</script>
