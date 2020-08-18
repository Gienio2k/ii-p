<template>
  <div class="blogSection">
    <v-chip>
      <h3>Aktualności</h3>
    </v-chip>
    <h3 class="typeHeader">Oczekujące</h3>
    <v-card outlined class="wrapper">
      <blog-handler type="pending" />
    </v-card>
    <br />
    <h3 class="typeHeader">Opublikowane</h3>
    <v-card outlined class="wrapper">
      <blog-handler type="published" />
    </v-card>
  </div>
</template>

<script>
import BlogHandler from "./items/BlogHandler.vue";

export default {
  name: "BlogSection",
  components: { BlogHandler },
  data() {
    return {};
  },
};
</script>

<style lang='scss'>
.blogSection {
  .v-chip {
    margin-bottom: 10px;
  }
  .wrapper {
    padding: 10px;
    margin-right: -60px;
    overflow-x: scroll;
    min-height: 300px;
  }
  .typeHeader {
    margin-left: 30px;
    margin-bottom: 5px;
  }
}
</style>