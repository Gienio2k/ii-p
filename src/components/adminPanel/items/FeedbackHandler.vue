<template>
  <div class="d-flex flex-row">
    <feedback-item
      @open-dialog="openDialog"
      v-for="{timestamp, content} in feedbackPosts"
      :timestamp="timestamp"
      :content="content"
      :key="timestamp"
    />
    <div style=" width: 100%;" v-if="feedbackPosts.length == 0">
      <h1 style="line-height: 300px; text-align:center;">Brak postów</h1>
    </div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="blue darken-4">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ timestampDate }}</v-toolbar-title>
      </v-toolbar>
      <v-card style="padding: 15px;">
        <div class="dialogContent ql-editor" v-html="content"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FeedbackItem from "./FeedbackItem.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
//import wait from "../../../utils/wait";

export default {
  name: "FeedbackHandler",
  props: [],
  components: { FeedbackItem },
  data() {
    return {
      feedbackPosts: [],
      dialog: false,
      timestamp: "",
      timestampDate: "",
      content: "",
    };
  },
  methods: {
    openDialog(timestampDate, timestamp, content) {
      this.timestampDate = timestampDate;
      this.timestamp = timestamp;
      this.content = content;
      this.dialog = true;
    },
    closeDialog() {
      this.timestampDate = "";
      this.timestamp = "";
      this.content = "";
      this.dialog = false;
    },
  },
  created() {
    //that's because we need to mount dialog which won't mount until we open it
    this.openDialog();
    //
    let altThis = this;
    firebase
      .firestore()
      .collection("feedback")
      .orderBy("timestamp")
      .onSnapshot(
        (docSnapshot) => {
          let posts = [];
          docSnapshot.forEach((doc) => {
            posts.push({
              content: doc.data().content,
              timestamp: doc.data().timestamp.toDate().getTime(),
            });
          });
          altThis.feedbackPosts = posts.reverse();
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    //
    this.closeDialog();
  },
};
</script>

<style lang="scss"></style>
