<template>
  <div
    class="modal"
    :class="{ 'modal--empty': !detailedPackage || detailedPackage.length < 1 }"
  >
    <v-card
      dark
      color="grey darken-4"
      v-if="detailedPackage && detailedPackage.length > 0"
    >
      <v-card-text>
        <div>{{ detailedPackage[0].package.author.name }}</div>
        <p class="modal__title display-1">
          {{ detailedPackage[0].package.name || "" }}
        </p>
        <div>
          {{ detailedPackage[0].package.description }}
        </div>
      </v-card-text>

      <v-list-item class="grow">
        <v-list-item-content color="grey darken-3">
          {{ detailedPackage[0].package.publisher.email }}
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>{{
            detailedPackage[0].package.publisher.username
          }}</v-list-item-title>
        </v-list-item-content>

        <v-btn @click="goToHomepage" color="secondary" x-small fab dark>
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="orange lighten-2" text @click="goToNpm"> Explore </v-btn>
        <v-btn color="red darken-1" text @click="closeModal">Cancel</v-btn>
      </v-card-actions>
    </v-card>
    <loader v-else />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { packages } from "@/store/modules/store.namespaces";
import Loader from "@/components/Loader.vue";

export default {
  name: "Modal",
  components: {
    Loader,
  },
  computed: {
    ...mapState(packages, ["detailedPackage"]),
  },
  methods: {
    ...mapMutations(packages, ["setDetailedPackage"]),
    closeModal() {
      this.$emit("closeModal");
      this.setDetailedPackage([]);
    },
    goToNpm() {
      window.open(this.detailedPackage[0].package.links.npm, "_blank");
    },
    goToHomepage() {
      window.open(this.detailedPackage[0].package.links.homepage, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  max-height: 300px;
  background-color: #212121;
  overflow: hidden;

  &--empty {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
