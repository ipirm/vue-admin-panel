<template>
  <div v-if="totalCount > 0" class="pagination">
    <div class="page-item" :class="{'disabled': activePage === 1}">
      <a href="#" @click.prevent="prev">Previous</a>
    </div>
    <div
      v-for="page in pageCount"
      :key="page"
      class="page-item"
      :class="{'active': page === activePage}"
      @click="go(page)"
    >
      <div>{{ page }}</div>
    </div>
    <div class="page-item" :class="{'disabled': activePage + 1 > pageCount}">
      <a href="#" @click="next">Next</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      activePage: 1
    }
  },

  computed: {
    pageCount() {
      return Number(this.meta['x-pagination-page-count']) || 0
    },
    currentPage() {
      return Number(this.meta['x-pagination-current-page']) || 1
    },
    totalCount() {
      return Number(this.meta['x-pagination-total-count']) || 0
    },
  },

  watch: {
    currentPage(val) {
      this.activePage = val;
      this.paginate()
    }
  },

  methods: {
    go(page) {
      this.activePage = page;
      this.paginate()
    },

    next() {
      if (this.activePage + 1 <= this.pageCount) this.activePage = this.activePage + 1
      this.paginate()
    },

    prev() {
      if (this.activePage > 1) this.activePage = this.activePage - 1
      this.paginate()
    },

    paginate() {
      this.$emit('paginate', { page: this.activePage })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  color: #212529;
}

.page-item {
  border: 1px solid #b5c9d5;
  min-width: 10px;
  margin-left: 5px;
  height: 17px;
  padding: 0 5px;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.disabled {
  cursor: default;
}

.active {
  background-color: #2980b9;
  color: white;
  cursor: default;
}

a {
  color: #212529;
}
</style>