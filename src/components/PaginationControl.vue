<template>
  <div class="pagination-control">
    <button
      v-if="currentPage > 1"
      @click="setCurrentPage(currentPage - 1)"
      class="pagination-control__button"
    >
      &lt;
    </button>
    <button
      v-if="currentPage > 2 && countOfPages > 3"
      @click="setCurrentPage(1)"
      :class="{
        'pagination-control__button': true,
        'pagination-control__button--active': pageIsCurrent(1),
      }"
    >
      {{ 1 }}
    </button>
    <span v-if="middlePages[0] > 2">..</span>
    <span v-if="currentPage > countOfPages - 3 && countOfPages > 5">..</span>
    <button
      v-for="pageNumber in middlePages"
      :key="pageNumber"
      @click="setCurrentPage(pageNumber)"
      :class="{
        'pagination-control__button': true,
        'pagination-control__button--active': pageIsCurrent(pageNumber),
      }"
    >
      {{ pageNumber }}
    </button>
    <span v-if="currentPage < countOfPages - 2 && countOfPages > 5">..</span>
    <span v-if="middlePages[middlePages.length - 1] + 1 < countOfPages"
      >..</span
    >
    <button
      @click="setCurrentPage(countOfPages)"
      v-if="currentPage < countOfPages - 1 && countOfPages > 3"
      :class="{
        'pagination-control__button': true,
        'pagination-control__button--active': pageIsCurrent(countOfPages),
      }"
    >
      {{ countOfPages }}
    </button>
    <button
      v-if="currentPage < countOfPages"
      @click="setCurrentPage(currentPage + 1)"
      class="pagination-control__button"
    >
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: "Catalogue",
  props: {
    itemsCount: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    countOfPages() {
      return Math.ceil(this.itemsCount / this.itemsPerPage);
    },
    middlePages() {
      if (this.countOfPages < 4) return this.countOfPages;
      let centerPage = this.currentPage;
      if (this.currentPage === 1) centerPage++;
      else if (this.currentPage === this.countOfPages) centerPage--;
      return [centerPage - 1, centerPage, centerPage + 1];
    },
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.$emit("setCurrentPage", pageNumber);
    },
    pageIsCurrent(pageNumber) {
      return pageNumber === this.currentPage;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-control {
  display: block;
  color: white;

  &__button {
    background-color: inherit;
    color: inherit;
    margin: 5px;
    border: none;
    text-decoration: underline;
    cursor: pointer;

    &--active {
      padding: 2px;
      background-color: #757575;
    }
  }
}
</style>
