<template>
  <div v-if="authenticated">
    <h1 class="header">Napisz post</h1>
    <v-divider></v-divider>
    <div class="setTitleImage">
      <h2>Obraz tytułowy</h2>
      <p>(opcjonalne)</p>
      <div v-if="image" class="insertImage" :style="'background-image: url(' + image + ');'"></div>
      <v-file-input
        @click:append="clearImage"
        show-size
        accept="image/*"
        label="Wybierz obraz"
        @change="file"
      ></v-file-input>
    </div>
    <div id="titleEditor" class="editor">
      <h2>Tytuł</h2>
      <v-text-field v-model="titleData" outlined></v-text-field>
    </div>
    <div id="contentEditor" class="editor">
      <div id="tiptap">
        <h2>Treść</h2>
        <vue-editor v-model="contentData"></vue-editor>
      </div>
    </div>
    <div class="saveBtns">
      <v-btn text @click="restore">przywróć z pamięci lokalnej</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!contentUnsaved" text @click="save">zapisz w pamięci lokalnej</v-btn>
    </div>
    <div class="btns d-flex justify-center">
      <v-btn :disabled="!unsaved" color="blue darken-4" @click="dialog = true">podgląd</v-btn>
    </div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar dark color="blue darken-4">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Podgląd</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn @click="publishDialog = true" dark text>opublikuj</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-dialog persistent v-model="publishDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Potwierdzenie</v-card-title>

          <v-card-text>Post zostanie wysłany do rozpatrzenia przez przewodniczącego.</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" text @click="publishDialog = false">anuluj</v-btn>

            <v-btn color="success" @click="send">Tak</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card>
        <div>
          <div class="postHeader">
            <div v-if="image" class="ifImage">
              <div
                class="postTitleImage"
                style="margin-top: 0;"
                :style="'background-image: url(\'' + image + '\');'"
              />
              <div class="postTitle">
                <h1>{{titleData}}</h1>
              </div>
              <v-divider></v-divider>
              <div class="postCredentials d-flex flex-row">
                <v-chip pill>
                  <v-avatar left size="25" color="blue darken-4">
                    <p
                      style="color: white; margin-top: 15px"
                    >{{ author.substring(0,1).toUpperCase() }}</p>
                  </v-avatar>
                  {{author}}
                </v-chip>
                <v-spacer></v-spacer>
                <p class="timestamp">{{timestampDate}}</p>
              </div>
              <div class="postContent ql-editor" v-html="contentData"></div>
            </div>
            <div v-else class="else">
              <div class="postTitleImage" :style="'background-image: url(\'' + image + '\');'" />
              <div class="postTitle">
                <h1>{{titleData}}</h1>
              </div>
              <v-divider></v-divider>
              <div class="postCredentials d-flex flex-row">
                <v-chip pill>
                  <v-avatar left size="25" color="blue darken-4">
                    <p
                      style="color: white; margin-top: 15px"
                    >{{ author.substring(0,1).toUpperCase() }}</p>
                  </v-avatar>
                  {{author}}
                </v-chip>
                <v-spacer></v-spacer>
                <p class="timestamp">{{timestampDate}}</p>
              </div>
              <div class="postContent ql-editor" v-html="contentData"></div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import toBase64 from "../utils/toBase64";
//import Cookie from "../utils/cookie.js";

export default {
  name: "CreatePost",
  data() {
    return {
      authenticated: false,
      customToolbar: [[]],
      titleData: "",
      contentData: "",
      image: "",
      dialog: false,
      publishDialog: false,
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
  created() {
    // if (Cookie.getCookie("data")) {
    //   console.log(Cookie.getCookie("data"));
    //   let data = JSON.parse(Cookie.getCookie("data"));
    //   this.titleData = data.titleData;
    //   this.contentData = data.contentData;
    // }
  },
  beforeDestroy() {
    // document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Cookie.setCookie(
    //   "data",
    //   JSON.stringify({
    //     titleData: this.titleData,
    //     contentData: this.contentData,
    //   })
    // );
  },
  computed: {
    contentUnsaved() {
      return this.contentData.length > 0;
    },
    unsaved() {
      return (
        this.titleData.length > 0 ||
        this.contentData.length > 0 ||
        this.image.length > 0
      );
    },
    author() {
      return firebase
        .auth()
        .currentUser.email.substring(
          firebase.auth().currentUser.email.length - 9,
          0
        );
    },
    timestampDate() {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date().toLocaleDateString("pl-pl", options);
    },
  },
  methods: {
    save() {
      localStorage.setItem(
        "postData",
        JSON.stringify({
          titleData: this.titleData,
          contentData: this.contentData,
          image: this.image,
        })
      );
    },
    restore() {
      let data = JSON.parse(localStorage.getItem("postData"));
      this.titleData = data.titleData;
      this.contentData = data.contentData;
      this.image = data.image;
    },
    send() {
      firebase
        .firestore()
        .collection("blog")
        .doc("posts")
        .collection("pending")
        .doc()
        .set({
          content: this.contentData,
          timestamp: firebase.firestore.Timestamp.fromMillis(Date.now()),
          author: this.author,
          title: this.titleData,
          image: this.image != "" ? this.image : null,
        });
      this.contentData = "";
      this.titleData = "";
      this.image = "";
      this.publishDialog = false;
      this.dialog = false;
    },
    clearImage() {
      console.log("yup");
    },
    async file(file) {
      if (file) {
        this.image = await toBase64(file);
      } else {
        this.image = "";
      }
    },
  },
};
</script>

<style lang='scss'>
.insertImage {
  width: 100%;
  height: 25vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.setTitleImage {
  margin: 25px;
}

.editor {
  margin: 25px;
}

#contentEditor {
  margin-top: -20px;
}

.btns {
  margin-bottom: 20px;
  .v-btn {
    margin: 10px;
  }
}

.saveBtns {
  width: 100%;

  .v-btn {
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    margin: 2px;
  }
}
</style>