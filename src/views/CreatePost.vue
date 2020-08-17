<template>
  <div v-if="authenticated">
    <h1 class="header">Napisz post</h1>
    <div class="editor">
      <div id="tiptap">
        <vue-editor v-model="editorData"></vue-editor>
      </div>
    </div>
    <div class="editor">
      <div id="tiptap">
        <vue-editor v-model="editorData"></vue-editor>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "CreatePost",
  data() {
    return {
      authenticated: false,
    };
  },
  beforeCreate() {
    let altThis = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        altThis.authenticated = true;
      } else {
        altThis.$router.push("/");
      }
    });
  },
};
</script>

<style lang='scss'>
.editor {
  margin: 25px;
}
</style>