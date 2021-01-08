<template>
  <v-app>
    <v-main>
      <main-container />
    </v-main>
  </v-app>
</template>

<script>
import MainContainer from "@/components/MainContainer.vue";

export default {
  name: "App",
  components: {
    MainContainer,
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 0;
  border-radius: 0;
  background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 0;
  border-radius: 0;
  background: #424242;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

html,
body {
  overflow: hidden;

  min-width: 320px;

  @media (min-width: 320px) {
    font-size: 12px;
  }

  @media (min-width: 760px) {
    font-size: 15px;
  }
}
</style>
