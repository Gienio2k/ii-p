<template>
  <div>
    <div class="editor">
      <h2>Przekaż informację przewodniczącemu</h2>
      <br />
      <div id="tiptap">
        <textarea v-model="editorData" cols="30" rows="10"></textarea>
      </div>
      <v-dialog persistent v-model="dialog" width="500">
        <template v-slot:activator="***REMOVED*** on, attrs ***REMOVED***">
          <v-btn class="submit" color="green" dark v-bind="attrs" v-on="on"
            >wyślij</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="headline">Potwierdzenie</v-card-title>

          <v-card-text>Czy na pewno chcesz wysłać tę wiadomość?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              style="float:left;"
              text
              @click="dialog = false"
              >Anuluj</v-btn
            >
            <v-btn dark @click="send()" color="green">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar color="success" v-model="snackbar" top right timeout="2000"
      >Wysłano wiadomość!</v-snackbar
    >
    <v-snackbar color="error" v-model="snackbarError" top right timeout="2000"
      >Nie możesz wysłać pustej wiadomości!</v-snackbar
    >
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/database";

export default ***REMOVED***
  name: "Feedback",
  components: ***REMOVED******REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      snackbar: false,
      snackbarError: false,
      dialog: false,
      editorData: this.$store.state.feedbackData,
    ***REMOVED***;
  ***REMOVED***,
  beforeDestroy() ***REMOVED***
    this.$store.state.feedbackData = this.editorData;
  ***REMOVED***,
  methods: ***REMOVED***
    send() ***REMOVED***
      if (this.editorData == "") ***REMOVED***
        this.dialog = false;
        this.snackbarError = true;
        return false;
      ***REMOVED***
      let key = Date.now();
      let data = ***REMOVED******REMOVED***;
      data[key.toString()] = ***REMOVED*** content: this.editorData, timestamp: key ***REMOVED***;
      firebase
        .database()
        .ref("feedback")
        .update(data);
      this.dialog = false;
      this.editorData = "";
      this.snackbar = true;
    ***REMOVED***,
  ***REMOVED***,
  mounted() ***REMOVED******REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
.editor ***REMOVED***
  margin: 25px;
***REMOVED***

.submit ***REMOVED***
  margin: 20px;
  margin-right: 0;
  float: right;
  color: white !important;
***REMOVED***

#tiptap ***REMOVED***
  color: black;
***REMOVED***
</style>
