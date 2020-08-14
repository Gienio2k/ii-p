<template>
  <v-card elevation="5" outlined class="item">
    <div class="itemHeader d-flex flex-row">
      <strong>***REMOVED******REMOVED***timestampDate***REMOVED******REMOVED***</strong>
      <v-spacer></v-spacer>
      <v-btn @click="open" icon>
        <v-icon x-large>mdi-fullscreen</v-icon>
      </v-btn>
    </div>
    <v-divider></v-divider>
    <div class="content" :class="'content' + timestamp.toString()"></div>
  </v-card>
</template>

<script>
import $ from "jquery";

export default ***REMOVED***
  name: "FeedbackItem",
  props: ["timestamp", "content"],
  data() ***REMOVED***
    return ***REMOVED******REMOVED***;
  ***REMOVED***,
  mounted() ***REMOVED***
    $(".content" + this.timestamp.toString()).append(this.content);
  ***REMOVED***,
  computed: ***REMOVED***
    timestampDate() ***REMOVED***
      let date = new Date(this.timestamp);
      return (
        date.toLocaleDateString("pl-pl") +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    ***REMOVED***,
  ***REMOVED***,
  methods: ***REMOVED***
    open() ***REMOVED***
      this.$emit(
        "open-dialog",
        this.timestampDate,
        this.timestamp,
        this.content
      );
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
.item ***REMOVED***
  padding: 10px;
  margin-right: 10px;
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  max-height: 300px;
  overflow-y: scroll;
  .v-divider ***REMOVED***
    margin-bottom: 10px;
  ***REMOVED***
  .itemHeader ***REMOVED***
    vertical-align: center;
    margin-bottom: 10px;
    strong ***REMOVED***
      margin-top: 5px;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
</style>