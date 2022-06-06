<template>
  <div>
    <!-- NOTE: 讀取畫面 -->
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-5">
      <button class="btn btn-primary my-3" @click="openProductModal(true)">建立新的產品</button>
    </div>
    <table class="table table-responsive-sm mt-2">
      <thead>
        <tr>
          <th width="100em">分類</th>
          <th>產品名稱</th>
          <th width="80em">原價</th>
          <th width="80em">售價</th>
          <th width="100em">是否啟用</th>
          <th width="140em">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in Products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency}}
          </td>
          <td>
            <span v-if="item.is_enabled" class="text-success">已啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openProductModal(false, item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm"
              @click="removeProduct(item.id)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- NOTE: 分頁 component -->
    <pagination :pagination='pagination' @trigger="getProducts"></pagination>

    <!-- Modal -->
    <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog"
      aria-labelledby="ProductModal" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
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
                    <i class="fas fa-spinner fa-spin" v-if="status.fileuploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files"
                    @change="uploadFile">
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
// TODO: 千分位
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
      isNew: false,
      isLoading: false,
      status: {
        fileuploading: false, // 上傳圖片 icon 切換
      },
      pagination: '',
    };
  },
  methods: {
    // NOTE: 開啟 ProductModal
    openProductModal(isNew, item) {
      this.$refs.files.value = ''; // 初始化上傳路徑
      // 新舊資料判斷
      if (isNew) {
        this.Product = {};
        this.isNew = true;
      } else {
        this.Product = Object.assign({}, item);
        this.isNew = false;
      }
      $('#ProductModal').modal('show');
    },
    // NOTE: 取得 Products
    getProducts(page = 1) {
      this.isLoading = true; // loading toggle
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/products?page=${page}`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.isLoading = false;
        this.Products = response.data.products;
        this.pagination = response.data.pagination;
      });
    },
    // NOTE: 新增編輯 Product
    addProduct() {
      let api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/product/${this.Product.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.Product }).then((response) => {
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
    // NOTE: 刪除 Product
    removeProduct(id) {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/product/${id}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        this.getProducts();
      });
    },
    // NOTE: 上傳圖片
    uploadFile() {
      console.log(this);
      this.status.fileuploading = true; // upload icon
      const uploadFile = this.$refs.files.files[0];
      // formData
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const url = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/upload`;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log(response);
        if (response.data.success) {
          this.status.fileuploading = false; // upload icon toggle
          this.$set(this.Product, 'imageUrl', response.data.imageUrl); // imageUrl v-model
        } else {
          // * Error Message
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
