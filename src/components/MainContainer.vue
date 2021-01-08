<template>
  <div class="container grey darken-4">
    <v-simple-table fixed-header height="90vh" dark>
      <template v-slot:default>
        <thead style="height: 40px;">
          <tr>
            <th class="grey darken-4">
              <v-text-field
                class="container__search mt-3 mb-0"
                width="50px"
                solo
                dark
                label="Search package"
                placeholder="Type for search"
                v-model="search"
                @keydown.space.prevent
              ></v-text-field>
            </th>
          </tr>
        </thead>
        <tbody v-if="!isLoading" class="grey darken-3">
          <list
            v-if="packagesList && packagesList.length > 0"
            :items="paginatedList"
            @getDetails="getDetails"
          />

          <div v-else class="container__empty">
            No results
          </div>
        </tbody>
        <tbody v-else>
          <loader />
        </tbody>
      </template>
    </v-simple-table>
    <div class="container__pagination">
      <pagination-control
        v-if="packagesCount > 0 && !isLoading"
        :itemsPerPage="itemsPerPage"
        :currentPage="page"
        :itemsCount="packagesCount"
        @setCurrentPage="setCurrentPage"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { packages } from "@/store/modules/store.namespaces";
import List from "@/components/List.vue";
import PaginationControl from "@/components/PaginationControl.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "MainContainer",
  components: { List, PaginationControl, Loader },
  data() {
    return {
      itemsPerPage: 10,
      page: 1,
      search: "",
    };
  },
  watch: {
    search(newVal) {
      this.page = 1;
      if (newVal === "") {
        return this.getPackagesList({
          itemsPerPage: this.itemsPerPage,
          page: this.page,
        });
      } else {
        this.setPaginatedList({
          itemsPerPage: this.itemsPerPage,
          page: this.page,
          filterText: newVal,
        });
      }
    },
  },
  computed: {
    ...mapState(packages, [
      "packagesList",
      "paginatedList",
      "isLoading",
      "detailedPackage",
    ]),
    packagesCount() {
      return this.packagesList.filter((item) => item.name.includes(this.search))
        .length;
    },
  },
  methods: {
    ...mapActions(packages, ["getPackagesList", "searchPackage"]),
    ...mapMutations(packages, ["setPaginatedList"]),
    setCurrentPage(pageNumber) {
      this.page = pageNumber;
      // we need to re-request the data, as new packages may have been added to the server
      this.getPackagesList({
        itemsPerPage: this.itemsPerPage,
        page: this.page,
        filterText: this.search,
      });
    },
    async getDetails(item) {
      if (item.type === "npm") {
        await this.searchPackage({ text: item.name });
      }
    },
  },
  mounted() {
    this.getPackagesList({ itemsPerPage: this.itemsPerPage, page: this.page });
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  overflow: hidden;

  &__empty {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &__pagination {
    margin-top: 0.5rem;
    text-align: center;
  }
}
</style>
