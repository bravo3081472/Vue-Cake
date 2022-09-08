<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"
            @click="upDataProduct(pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page"
          :class="{'active': pagination.current_page === page}">
          <a class="page-link" href="#products_list" @click="upDataProduct(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled': !pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"
            @click="upDataProduct(pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    // NOTE: Func - pagination 控制
    /**
     * @param
     * {{ total_pages: number,
     *    current_page: number,
     *    has_pre: boolean,
     *    has_next: boolean,}} page pagination
     */
    upDataProduct(page) {
      this.$emit('trigger', page);
    },
  },
};
</script>
