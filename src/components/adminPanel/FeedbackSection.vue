<template>
  <div class="feedbackSection">
    <v-chip>
      <h3>Feedback</h3>
    </v-chip>
    <v-card outlined class="wrapper">
      <!-- <div class="d-flex flex-row" v-if="feedbackPosts.length > 0"> -->
      <feedback-handler />
      <!-- </div> -->
      <!-- <div
        style="font-size: 30px; text-align:center; width: 100%; line-height: 300px; color: gray;"
        v-else
      >
        Brak wiadomości
      </div>-->
    </v-card>
  </div>
</template>

<script>
import FeedbackHandler from "./items/FeedbackHandler.vue";

//import reverseObject from "../../utils/reverseObject";

export default {
  name: "FeedbackSection",
  components: { FeedbackHandler },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.feedbackSection {
  .v-chip {
    margin-bottom: 10px;
  }
  .wrapper {
    padding: 10px;
    margin-right: -60px;
    overflow-x: scroll;
    min-height: 300px;
  }
}
</style>
