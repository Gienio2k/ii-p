<template>
  <div class="d-flex flex-row">
    <blog-item
      @open-dialog="openDialog"
      v-for="{timestamp, title, author, content,image } in blogPosts"
      :timestamp="timestamp"
      :title="title"
      :author="author"
      :content="content"
      :image="image"
      :key="timestamp"
    />
    <div style=" width: 100%;" v-if="blogPosts.length == 0">
      <h1 style="line-height: 300px; text-align:center;">Brak postów</h1>
    </div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-toolbar fixed dark color="blue darken-4">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ timestampDate }}</v-toolbar-title>
      </v-toolbar>
      <div class="d-flex flex-row">
        <v-card class="bottomBar" color="blue darken-4">
          <div v-if="type == 'pending'" class="pending">
            <v-btn color="error" @click="deletePostDialog = true">usuń</v-btn>
            <v-btn color="success" class="publishBtn" @click="publishPostDialog = true">opublikuj</v-btn>
          </div>
          <div v-if="type == 'published'" class="published">
            <v-btn color="error" @click="deletePostDialog = true">usuń</v-btn>
          </div>
        </v-card>
      </div>
      <v-card style="padding: 15px;">
        <div>
          <div class="postHeader">
            <div v-if="image" class="ifImage">
              <div
                class="postTitleImage"
                style="margin-top: 0;"
                :style="'background-image: url(\'' + image + '\');'"
              />
              <div class="postTitle">
                <h1>{{title}}</h1>
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
                <p class="timestamp">{{timestamp}}</p>
              </div>
              <div class="postContent ql-editor" v-html="content"></div>
            </div>
            <div v-else class="else">
              <div
                class="postTitleImage"
                style="margin-top: 0;"
                :style="'background-image: url(\'' + image + '\');'"
              />
              <div class="postTitle">
                <h1>{{title}}</h1>
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
              <div class="postContent ql-editor" v-html="content"></div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- dialogs -->
    <v-dialog persistent v-model="deletePostDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Potwierdzenie</v-card-title>

        <v-card-text>Post zostanie usunięty .</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="deletePostDialog = false">anuluj</v-btn>

          <v-btn color="success" @click="deletePost">Tak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="publishPostDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Potwierdzenie</v-card-title>

        <v-card-text>Post zostanie opublikowany.</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" text @click="publishPostDialog = false">anuluj</v-btn>

          <v-btn color="success" @click="publishPost">Tak</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BlogItem from "./BlogItem.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";
//import wait from "../../../utils/wait";

export default {
  name: "BlogHandler",
  props: ["type"],
  components: { BlogItem },
  data() {
    return {
      blogPosts: [],
      dialog: false,
      timestamp: "",
      timestampDate: "",
      title: "",
      author: "",
      content: "",
      image: "",
      deletePostDialog: false,
      publishPostDialog: false,
    };
  },

  methods: {
    deletePost() {
      firebase
        .firestore()
        .collection("blog")
        .doc("posts")
        .collection(this.type)
        .where(
          "timestamp",
          "==",
          firebase.firestore.Timestamp.fromMillis(this.timestamp)
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.deletePostDialog = false;
      this.dialog = false;
    },
    publishPost() {
      firebase
        .firestore()
        .collection("blog")
        .doc("posts")
        .collection("pending")
        .where(
          "timestamp",
          "==",
          firebase.firestore.Timestamp.fromMillis(this.timestamp)
        )
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let altDoc = doc;
            firebase
              .firestore()
              .collection("blog")
              .doc("posts")
              .collection("published")
              .doc()
              .set(doc.data())
              .catch((err) => {
                console.log(err);
              })
              .then(() => {
                altDoc.ref.delete();
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.publishPostDialog = false;
      this.dialog = false;
    },

    openDialog(timestampDate, timestamp, title, author, content, image) {
      this.timestampDate = timestampDate;
      this.timestamp = timestamp;
      this.dialog = true;
      this.title = title;
      this.author = author;
      this.content = content;
      this.image = image;
    },
    closeDialog() {
      this.timestampDate = "";
      this.timestamp = "";
      this.title = "";
      this.author = "";
      this.content = "";
      this.image = "";
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
      .collection("blog")
      .doc("posts")
      .collection(this.type)
      .orderBy("timestamp")
      .onSnapshot(
        (docSnapshot) => {
          let posts = [];
          docSnapshot.forEach((doc) => {
            posts.push({
              content: doc.data().content,
              timestamp: doc.data().timestamp.toDate().getTime(),
              image: doc.data().image,
              author: doc.data().author,
              title: doc.data().title,
            });
          });
          altThis.blogPosts = posts.reverse();
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

<style lang="scss">
.bottomBar {
  border-radius: 0 !important;
  padding: 10px;
  width: 100%;
  .pending {
    .publishBtn {
      float: right;
    }
  }
}
</style>
