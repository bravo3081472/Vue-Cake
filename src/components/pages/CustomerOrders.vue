<template>
  <div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in pagingProducts" :key=item.id>
        <div class="card card-item">

          <div class="card-item__image" :style="{backgroundImage: `url(${item.imageUrl})`}">
            <span class="badge badge-secondary card-item__image__sort">{{ item.category }}</span>
            <a href="#" class="card-item__image__link" @click.prevent="GetProduct(item.id)"></a>
          </div>

          <div class="card-body">
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text card-item__content">{{ item.content }}</p>
          </div>

          <div class="d-flex align-items-end p-3">
            <div class="input-group card-item__count">
              <span class="btn" @click="ProductCountControl('reduce')"> - </span>
              <input class="form-control" type="text" v-model.number="productCount">
              <span class="btn" @click="ProductCountControl('add')"> + </span>
            </div>
            <div class="card-item__price">
              <div class="h5">現在只要 {{ item.price }} 元</div>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
            </div>
          </div>

          <div class="card-footer p-0">
            <button type="button" class="btn card-item__button"
              @click="AddCart(item.id, productCount)">
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- NOTE: Component - "pagination" -->
    <pagination class="d-flex mt-3 justify-content-center" :pagination="pagination"
      @trigger="GetProducts"></pagination>

    <!-- NOTE: Modal - 商品詳細資料 -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productsModalLabel"
      aria-hidden>
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-body">
            <div class="row">

              <button type="button" class="close close-button" data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>

              <div class="col-md modal-products__image">
                <img alt="" class="img-fluid" :src="Product.imageUrl">
              </div>

              <div class="col modal-products__container">
                <div class="modal-products__title">
                  <h2 id="productModalLabel">{{ Product.title }}</h2>
                  <span class="badge badge-secondary">{{ Product.category }}</span>
                </div>
                <div class="modal-products__content">
                  <p class="text">{{ Product.content }}</p>
                </div>
                <div class="modal-products__content__footer">
                  <div class="d-flex w-100 align-items-end">
                    <div class="input-group modal-products__content__footer__count">
                      <span class="btn" @click="ProductCountControl('reduce')"> - </span>
                      <input class="form-control" type="text" v-model.number="productCount">
                      <span class="btn" @click="ProductCountControl('add')"> + </span>
                    </div>
                    <div class="ml-auto text-right">
                      <del class="h6">原價 {{ Product.origin_price }} 元</del>
                      <div class="h5">現在只要 {{ Product.price }} 元</div>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary w-100 mt-4">
                    加到購物車
                  </button>
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
import $ from 'jquery';
import pagination from '@/components/pagination';

export default {
  components: {
    pagination,
  },
  data() {
    return {
      Products: [],
      Product: {},
      productCount: 1,
      pagination: '',
      pagingProducts: [],
    };
  },
  methods: {
    // NOTE: Func - Get API JSON Data[] Products & 自定義分頁
    GetProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/products`;
      const vm = this;
      this.$http.get(api).then((response) => {
        // console.log('GetProducts', response.data);
        vm.Products = response.data.products.filter(item => item.is_enabled === 1);
        /**
         * 自定義分頁
         * @param {Array} Data - API Data
         * @param {number} nowPage - Func GetProducts page
         */
        function FilterPaginationData(Data, nowPage) {
          // 分析資料
          const dataTotal = Data.length;
          const perPage = 6;
          const pageTotal = Math.ceil(dataTotal / perPage);
          let currentPage = nowPage;
          // 避免當前分頁超出範圍
          if (currentPage > pageTotal) {
            currentPage = pageTotal;
          }
          // 計算分頁資料範圍
          const minData = ((currentPage * perPage) - perPage) + 1;
          const maxData = (currentPage * perPage);
          // 建立範圍內的資料
          const newData = [];
          Data.forEach((item, index) => {
            const num = index + 1;
            if (num >= minData && num <= maxData) {
              newData.push(item);
            }
          });
          vm.pagingProducts = newData;
          vm.pagination = {
            total_pages: pageTotal,
            current_page: currentPage,
            has_pre: currentPage > 1,
            has_next: currentPage < pageTotal,
          };
        }
        FilterPaginationData(vm.Products, page);
      });
    },
    // NOTE: Func - Get API The ID JSON Data{} Product & Open productModal
    GetProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/product/${id}`;
      const vm = this;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.Product = response.data.product;
        $('#productModal').modal('show');
      });
    },
    // NOTE: Func - Apply 優惠卷 Code
    AddCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/cart`;
      // const vm = this;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then(() => {
        // console.log('AddCart', response.data);
        $('#productModal').modal('hide');
        // NOTE: send - Event CartModal.vue GetCard()
        this.$bus.$emit('GetCart');
      });
    },
    // NOTE: HACK: Func - Count 購買數量
    ProductCountControl(countState) {
      const vm = this;
      switch (countState) {
        case 'add':
          vm.productCount += 1;
          break;
        case 'reduce':
          vm.productCount -= 1;
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.GetProducts();
  },
};
</script>
