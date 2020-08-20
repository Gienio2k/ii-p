<template>
  <div>
    <div class="editor">
      <h2>Przekaż informację przewodniczącemu</h2>
      <br />
      <div id="tiptap">
        <vue-editor v-model="editorData"></vue-editor>
      </div>
      <v-dialog persistent v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="!isEmpty"
            class="submit"
            color="green"
            dark
            v-bind="attrs"
            v-on="on"
          >wyślij</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Potwierdzenie</v-card-title>

          <v-card-text>Czy na pewno chcesz wysłać tę wiadomość?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" style="float:left;" text @click="dialog = false">Anuluj</v-btn>
            <v-btn dark @click="send()" color="green">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-card v-if="isSaved" class="saved" outlined>
      <h2>Twoje zgłoszenia</h2>
    </v-card>
    <v-snackbar color="success" v-model="snackbar" top right timeout="2000">Wysłano wiadomość!</v-snackbar>
    <v-snackbar
      color="error"
      v-model="snackbarError"
      top
      right
      timeout="2000"
    >Nie możesz wysłać pustej wiadomości!</v-snackbar>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";
import { VueEditor } from "vue2-editor";

export default {
  name: "Feedback",
  components: { VueEditor },

  data() {
    return {
      snackbar: false,
      snackbarError: false,
      dialog: false,
      editorData: this.$store.state.feedbackData,
      savedPosts: [],
    };
  },
  beforeDestroy() {
    this.$store.state.feedbackData = this.editorData;
  },
  methods: {
    send() {
      let data = {
        content: this.editorData,
        timestamp: firebase.firestore.Timestamp.now(),
      };
      firebase.firestore().collection("feedback").doc().set(data);
      this.editorData = "";
      this.snackbar = true;
      this.dialog = false;
    },
  },
  computed: {
    isSaved() {
      return localStorage.getItem("feedbackDocId") ? true : false;
    },
    isEmpty() {
      return this.editorData.length > 0;
    },
  },
};
</script>

<style lang="scss">
@import url(../assets/ql.css);

.editor {
  margin: 25px;
}

.submit {
  margin: 20px;
  margin-right: 0;
  float: right;
  color: white !important;
}

.saved {
  margin: 25px;
  margin-top: 76px;
  padding: 10px;
}
</style>
