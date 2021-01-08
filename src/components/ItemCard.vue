<template>
  <div class="card mb-2" :class="cardClasses(itemIndex)">
    <v-card color="grey darken-4" dark>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline" v-text="item.name"></v-card-title>

          <v-card-subtitle v-text="item.type"></v-card-subtitle>

          <v-card-actions>
            <v-dialog
              v-if="item.type === 'npm'"
              v-model="modal"
              max-width="400px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  class="ml-2 mt-5"
                  outlined
                  rounded
                  small
                  @click="getDetails(item)"
                >
                  details
                </v-btn>
              </template>
              <modal @closeModal="closeModal" />
            </v-dialog>

            <v-btn
              v-else
              class="ml-2 mt-5"
              outlined
              rounded
              small
              @click="getToGithub(item)"
            >
              GitHub
            </v-btn>
          </v-card-actions>
        </div>

        <v-avatar class="ma-3" size="125" tile>
          <v-img
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            v-if="item.type === 'npm'"
            src="@/assets/npmlogo.png"
          ></v-img>
          <v-img
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            v-if="item.type === 'gh'"
            src="@/assets/GitHublogo.png"
          ></v-img>
        </v-avatar>
      </div>
    </v-card>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
export default {
  name: "ItemCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      modal: false,
    };
  },
  components: {
    Modal,
  },
  methods: {
    cardClasses(index) {
      return [
        {
          "card--even": index % 2 === 0,
          "card--odd": index % 2 !== 0,
        },
      ];
    },
    closeModal() {
      this.modal = false;
    },
    getDetails(item) {
      this.$emit("getDetails", item);
    },
    getToGithub(item) {
      window.open(`https://github.com/${item.name}`, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  &--even {
    border: 1px solid #ff2a6d;

    button {
      color: #ffff00;
    }
  }

  &--odd {
    border: 1px solid #ffff00;

    button {
      color: #ff2a6d;
    }
  }
}

.headline {
  color: #067dac;
  text-shadow: 1px 1px 1px black, 0 0 0.5em #742b67;
}
</style>
