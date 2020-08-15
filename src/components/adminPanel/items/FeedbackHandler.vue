<template>
  <div class="d-flex flex-row">
    <feedback-item
      @open-dialog="openDialog"
      v-for="post in feedbackPosts"
      :timestamp="post.timestamp"
      :content="post.content"
      :key="post.timestamp"
    />
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="blue darken-4">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>***REMOVED******REMOVED*** timestampDate ***REMOVED******REMOVED***</v-toolbar-title>
      </v-toolbar>
      <v-card style="padding: 15px;"
        ><div class="dialogContent ql-editor">
          Musisz zamknąć to okienko i jeszcze raz je otworzyć
        </div></v-card
      >
    </v-dialog>
  </div>
</template>

<script>
import FeedbackItem from "./FeedbackItem.vue";
import $ from "jquery";
import * as firebase from "firebase/app";
import "firebase/firestore";
//import wait from "../../../utils/wait";

export default ***REMOVED***
  name: "FeedbackHandler",
  props: [],
  components: ***REMOVED*** FeedbackItem ***REMOVED***,
  data() ***REMOVED***
    return ***REMOVED***
      feedbackPosts: [],
      dialog: false,
      timestamp: "",
      timestampDate: "",
      content: "",
    ***REMOVED***;
  ***REMOVED***,
  methods: ***REMOVED***
    openDialog(timestampDate, timestamp, content) ***REMOVED***
      console.log("opent");
      this.timestampDate = timestampDate;
      this.timestamp = timestamp;
      this.content = content;
      $(".dialogContent").html(content);
      this.dialog = true;
    ***REMOVED***,
    closeDialog() ***REMOVED***
      console.log("colsed");
      this.timestampDate = "";
      this.timestamp = "";
      this.content = "";
      this.dialog = false;
    ***REMOVED***,
  ***REMOVED***,
  created() ***REMOVED***
    //that's because we need to mount dialog which won't mount until we open it
    this.openDialog();
    //
    let altThis = this;
    firebase
      .firestore()
      .collection("feedback")
      .orderBy("timestamp")
      .onSnapshot(
        (docSnapshot) => ***REMOVED***
          let posts = [];
          docSnapshot.forEach((doc) => ***REMOVED***
            posts.push(***REMOVED***
              content: doc.data().content,
              timestamp: doc
                .data()
                .timestamp.toDate()
                .getTime(),
            ***REMOVED***);
          ***REMOVED***);
          altThis.feedbackPosts = posts.reverse();
        ***REMOVED***,
        (err) => ***REMOVED***
          console.log(`Encountered error: $***REMOVED***err***REMOVED***`);
        ***REMOVED***
      );
    //
    this.closeDialog();
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss"></style>
