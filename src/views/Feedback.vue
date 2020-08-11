<template>
  <div>
    <div class="editor">
      <h2>Przekaż informację przewodniczącemu</h2>
      <br />
      <div class="ckeditor">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </div>
      <v-dialog persistent v-model="dialog" width="500">
        <template v-slot:activator="***REMOVED*** on, attrs ***REMOVED***">
          <v-btn class="submit" color="green" dark v-bind="attrs" v-on="on">wyślij</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Potwierdzenie</v-card-title>

          <v-card-text>Czy na pewno chcesz wysłać tę wiadomość?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" style="float:left;" text @click="dialog = false">Anuluj</v-btn>
            <v-btn color="green">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default ***REMOVED***
  name: "Feedback",
  components: ***REMOVED******REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      dialog: false,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: ***REMOVED***
        // The configuration of the editor.
      ***REMOVED***,
    ***REMOVED***;
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
@import "../assets/ckeditor.css";

.editor ***REMOVED***
  margin: 25px;
***REMOVED***

.submit ***REMOVED***
  margin: 20px;
  margin-right: 0;
  float: right;
  color: white !important;
***REMOVED***

.ckeditor ***REMOVED***
  color: black;
***REMOVED***
</style>
