<template>
  <div class="feedbackSection">
    <h3>Feedback</h3>
    <v-card outlined class="wrapper">
      <!-- <div class="d-flex flex-row" v-if="feedbackPosts.length > 0"> -->
      <feedback-handler />
      <!-- </div> -->
      <!-- <div
        style="font-size: 30px; text-align:center; width: 100%; line-height: 300px; color: gray;"
        v-else
      >
        Brak wiadomości
      </div> -->
    </v-card>
  </div>
</template>

<script>
import FeedbackHandler from "./items/FeedbackHandler.vue";

//import reverseObject from "../../utils/reverseObject";

export default ***REMOVED***
  name: "FeedbackSection",
  components: ***REMOVED*** FeedbackHandler ***REMOVED***,

  data() ***REMOVED***
    return ***REMOVED******REMOVED***;
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
.feedbackSection ***REMOVED***
  h3 ***REMOVED***
    margin-bottom: 10px;
  ***REMOVED***
  .wrapper ***REMOVED***
    padding: 10px;
    margin-right: -60px;
    overflow-x: scroll;
    min-height: 300px;
  ***REMOVED***
***REMOVED***
</style>
