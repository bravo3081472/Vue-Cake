<template>
  <div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in pagingProducts" :key=item.id>
        <div class="card card_item">
          <div class="card_item_image" :style="{backgroundImage: `url(${item.imageUrl})`}">
            <span class="badge badge-secondary card_item_sort">{{ item.category }}</span>
            <a href="#" class="image_link" @click.prevent="GetProduct(item.id)"></a>
          </div>
          <div class="card-body">
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text card_item_content">{{ item.content }}</p>
          </div>
          <div class="d-flex align-items-end p-3">
            <div class="input-group card_item_count">
              <span class="btn" @click="ProductCountControl('reduce')"> - </span>
              <input class="form-control" type="text" v-model.number="productCount">
              <span class="btn" @click="ProductCountControl('add')"> + </span>
            </div>
            <div class="card_item_price">
              <div class="h5">現在只要 {{ item.price }} 元</div>
              <del class="h6">原價 {{ item.origin_price }} 元</del>
            </div>
          </div>
          <div class="card-footer p-0">
            <button type="button" class="btn card_item_button"
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
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-body">
            <div class="row">

              <div class="col model_image">
                <img alt="" class="img-fluid" :src="Product.imageUrl">
              </div>

              <div class="col model_container">
                <div class="model_title">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h2 id="productModalLabel">{{ Product.title }}</h2>
                  <span class="badge badge-secondary">{{ Product.category }}</span>
                </div>
                <div class="modal_content">
                  <p class="text">{{ Product.content }}</p>
                </div>
                <div class="modal_content_footer">
                  <div class="d-flex w-100 align-items-end">
                    <div class="input-group content_footer_count">
                      <span class="btn" @click="ProductCountControl('reduce')"> - </span>
                      <input class="form-control" type="text" v-model.number="productCount">
                      <span class="btn" @click="ProductCountControl('add')"> + </span>
                    </div>
                    <div class="ml-auto text-right">
                      <del class="h6">原價 {{ Product.origin_price }} 元</del>
                      <div class="h3">現在只要 {{ Product.price }} 元</div>
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
        console.log(response.data);
        vm.Products = response.data.products;

        // 自定義分頁
        function FilterPaginationData(Data, nowPage) {
          // 分析資料
          const dataTotal = Data.length;
          const perPage = 6;
          const pageTotal = Math.ceil(dataTotal / perPage);
          console.log(dataTotal, perPage, pageTotal);
          let currentPage = nowPage;
          console.log(currentPage);
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
      this.$http.post(api, { data: cart }).then((response) => {
        console.log(response.data);
        $('#productModal').modal('hide');
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
// TODO: 將 style 拉出到 all.css
// NOTE: scss - 獨立 style
<style lang="scss" scoped>
%input_count {
  border: 1px solid #000;
  border-radius: 50px;
  & > span {
    border: none;
  }
  & input[type='text'] {
    border: none;
    text-align: center;
  }
}

/* Products Card item
-------------------------------------------------- */
.card_item {
  border: 1px solid #ccc;
  height: 100%;
  .card_item_image {
    height: 300px;
    background-size: cover;
    background-position: center;
    .image_link {
      display: flex;
      width: 100%;
      height: 100%;
    }
    &:hover .image_link {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .card_item_sort {
    margin: 0.5rem;
    position: absolute;
    right: 0;
    font-size: 1rem;
  }
  .card_item_content {
    height: 3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .card_item_count {
    width: 15rem;
    @extend %input_count;
  }
  .card_item_price {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
  }
  .card_item_button {
    width: 100%;
    margin: 0;
    padding: 0.75rem;
  }
}

/* Product Modal
-------------------------------------------------- */
.model_image {
  display: flex;
  width: 500px;
  height: 500px;
  & > img {
    width: 100%;
    height: auto;
    align-content: center;
    justify-content: center;
    object-fit: cover;
  }
}
.model_container {
  display: flex;
  height: 500px;
  flex-direction: column;
}
.model_title {
  & > h2 {
    display: inline;
  }
}
.modal_content {
  margin: 2rem 0;
  font-size: 24px;
}
.modal_content_footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: auto;
  .content_footer_count {
    @extend %input_count;
    width: 50%;
    justify-content: flex-start;
    & input[type='text'] {
      width: 20px;
    }
  }
}
</style>