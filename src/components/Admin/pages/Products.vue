<template>
  <div>
    <div class="text-right mt-5">
      <button class="btn btn-primary my-3">建立新的產品</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      Products: [],
      Product: {},
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/products?page=:page`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        this.Products = response.data.products;
      });
    },
    addProduct() {
      const api = `${process.env.APIPATH}/api/${process.env.VUECAKE}/admin/product`;
      this.$http.get(api).then((response) => {
        console.log(response.data);
      });
    }
  },
  created() {
    this.getProducts();
  },
};
</script>
