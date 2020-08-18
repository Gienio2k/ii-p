<template>
  <v-card elevation="5" outlined class="item">
    <div class="itemHeader d-flex flex-row">
      <strong>{{ timestampDate }}</strong>
      <v-spacer></v-spacer>
      <v-btn @click="open" icon>
        <v-icon x-large>mdi-fullscreen</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="content">
      <i>Tytuł:</i>
      <h1>{{title}}</h1>
      <i>Autor:</i>
      <h3>{{author}}</h3>
      <br />
      <i>Powiększ, aby wyświetlić zawartość</i>
    </div>
  </v-card>
</template>

<script>
import dateParse from "../../../utils/dateParse";

export default {
  name: "BlogItem",
  props: ["timestamp", "title", "author", "content", "image"],
  data() {
    return {};
  },

  computed: {
    timestampDate() {
      let date = new Date(this.timestamp);
      return (
        date.toLocaleDateString("pl-pl") +
        " " +
        dateParse(date.getHours()) +
        ":" +
        dateParse(date.getMinutes()) +
        ":" +
        dateParse(date.getSeconds())
      );
    },
  },
  methods: {
    open() {
      this.$emit(
        "open-dialog",
        this.timestampDate,
        this.timestamp,
        this.title,
        this.author,
        this.content,
        this.image
      );
    },
  },
};
</script>

<style lang="scss">
@import url(https://cdn.bootcss.com/quill/1.3.6/quill.snow.min.css);

.item {
  padding: 10px;
  margin-right: 10px;
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow: hidden;
  .v-divider {
    margin-bottom: 10px;
  }
  .itemHeader {
    vertical-align: center;
    margin-bottom: 10px;
    strong {
      margin-top: 5px;
    }
  }
}
</style>
