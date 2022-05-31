<template>
  <div>
    <div class="text-right mt-5">
      <button class="btn btn-primary my-3" @click="openProductModal">建立新的產品</button>
    </div>
    <table class="table table-responsive-sm mt-2">
      <thead>
        <tr>
          <th width="100em">分類</th>
          <th>產品名稱</th>
          <th width="80em">原價</th>
          <th width="80em">售價</th>
          <th width="100em">是否啟用</th>
          <th width="80em">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in Products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price }}
          </td>
          <td class="text-right">
            {{ item.price }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog"
      aria-labelledby="ProductModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ProductModal">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結"
                    v-model="Product.imageUrl">
                </div>
                <div class="form-group">
                  <label class="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin"></i>
                  </label>
                  <input type="files" id="customFile" class="form-control" ref="files">
                </div>
                <img class="img-fluid" alt="" :src="Product.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                    v-model="Product.title">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                      v-model="Product.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="text" class="form-control" id="price" placeholder="請輸入單位"
                      v-model="Product.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="text" class="form-control" id="category" placeholder="請輸入原價"
                      v-model="Product.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="text" class="form-control" id="price" placeholder="請輸入售價"
                      v-model="Product.price">
                  </div>
                  <hr>
                </div>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <input type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                    v-model="Product.description">
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <input type="text" class="form-control" id="content" placeholder="請輸入說明內容"
                    v-model="Product.content">
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="Product.is_enabled"
                      :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addProduct">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// TODO: 新增商品
// TODO: 刪除商品
// TODO: loading 畫面
// TODO: 千分位
// TODO: 分頁功能
import $ from 'jquery';

export default {
  data() {
    return {
      Products: [],
      Product: {},
    };
  },
  methods: {
    openProductModal() {
      $('#ProductModal').modal('show');
    },
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/products?page=:page`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.Products = response.data.products;
      });
    },
    addProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/product`;
      this.$http.post(api, { data: this.Product }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          $('#ProductModal').modal('hide');
          this.getProducts();
        } else {
          $('#ProductModal').modal('hide');
          this.getProducts();
          console.log('新增失敗');
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
