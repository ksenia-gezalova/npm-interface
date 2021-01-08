<template>
  <div class="list">
    <item-card
      :item="item"
      :itemIndex="i"
      v-for="(item, i) in items"
      :key="item.hits"
      @getDetails="getDetails(item)"
    />
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";

export default {
  name: "List",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    ItemCard,
  },
  methods: {
    getDetails(item) {
      this.$emit("getDetails", item);
    },
  },
};
</script>
