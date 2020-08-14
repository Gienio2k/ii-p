<template>
  <div class="feedbackSection">
    <h3>Feedback</h3>
    <v-card outlined class="wrapper d-flex flex-row">
      <feedback-item
        @open-dialog="openDialog"
        v-for="post in feedbackPosts"
        :timestamp="post.timestamp"
        :content="post.content"
        :key="post.timestamp"
      />
    </v-card>
    <feedback-dialog
      @close="dialog = false"
      :opened="dialog"
      :timestampDate="timestampDate"
      :timestamp="timestamp"
      :content="content"
    />
  </div>
</template>

<script>
import FeedbackItem from "./items/FeedbackItem.vue";
import FeedbackDialog from "./items/FeedbackDialog.vue";
import * as firebase from "firebase/app";
import "firebase/database";
import reverseObject from "../../utils/reverseObject";

export default ***REMOVED***
  name: "FeedbackSection",
  components: ***REMOVED*** FeedbackItem, FeedbackDialog ***REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      feedbackPosts: ***REMOVED******REMOVED***,
      dialog: false,
      timestamp: "",
      timestampDate: "",
      content: "",
    ***REMOVED***;
  ***REMOVED***,
  created() ***REMOVED***
    let altThis = this;
    firebase
      .database()
      .ref("/feedback")
      .on("value", function (snapshot) ***REMOVED***
        altThis.feedbackPosts = reverseObject(snapshot.val());
      ***REMOVED***);
  ***REMOVED***,
  methods: ***REMOVED***
    openDialog(timestampDate, timestamp, content) ***REMOVED***
      this.timestampDate = timestampDate;
      this.timestamp = timestamp;
      this.content = content;
      this.dialog = true;
    ***REMOVED***,
  ***REMOVED***,
***REMOVED***;
</script>

<style lang='scss'>
.feedbackSection ***REMOVED***
  h3 ***REMOVED***
    margin-bottom: 10px;
  ***REMOVED***
  .wrapper ***REMOVED***
    padding: 10px;
    margin-right: -60px;
    overflow-x: scroll;
  ***REMOVED***
***REMOVED***
</style>

