<template>
  <div>
    <div class="postHeader">
      <div v-if="post.image" class="ifImage">
        <div class="postTitleImage" :style="'background-image: url(\'' + post.image + '\');'" />
        <div class="postTitle">
          <h1>{{post.title}}</h1>
        </div>
        <v-divider></v-divider>
        <div class="postCredentials d-flex flex-row">
          <v-chip pill>
            <v-avatar left size="25" color="blue darken-4">
              <p
                style="color: white; margin-top: 15px"
              >{{ post.author.substring(0,1).toUpperCase() }}</p>
            </v-avatar>
            {{post.author}}
          </v-chip>
          <v-spacer></v-spacer>
          <p class="timestamp">{{timestampDate}}</p>
        </div>
        <div class="postContent ql-editor" v-html="post.content"></div>
      </div>
      <div v-else class="else">
        <div class="postTitleImage" :style="'background-image: url(\'' + post.image + '\');'" />
        <div class="postTitle">
          <h1>{{post.title}}</h1>
        </div>
        <v-divider></v-divider>
        <div class="postCredentials d-flex flex-row">
          <v-chip pill>
            <v-avatar left size="25" color="blue darken-4">
              <p
                style="color: white; margin-top: 15px"
              >{{ post.author.substring(0,1).toUpperCase() }}</p>
            </v-avatar>
            {{post.author}}
          </v-chip>
          <v-spacer></v-spacer>
          <p class="timestamp">{{timestampDate}}</p>
        </div>
        <div class="postContent ql-editor" v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "SeePost",
  data() {
    return {
      post: {},
    };
  },
  beforeCreate() {
    firebase
      .firestore()
      .collection("blog")
      .doc("posts")
      .collection("published")
      .where(
        "timestamp",
        "==",
        firebase.firestore.Timestamp.fromMillis(this.$route.params.timestamp)
      )
      .onSnapshot((docSnapshot) => {
        docSnapshot.forEach((doc) => {
          this.post = {
            timestamp: doc.data().timestamp.toDate().getTime(),
            content: doc.data().content,
            title: doc.data().title,
            author: doc.data().author,
            image: doc.data().image,
          };
        });
      });
  },
  computed: {
    timestampDate() {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(this.post.timestamp).toLocaleDateString("pl-pl", options);
    },
  },
};
</script>

<style lang='scss'>
@import url(https://cdn.bootcss.com/quill/1.3.6/quill.snow.min.css);

.ifImage {
  .postTitleImage {
    height: 400px;
    width: 600px;
    margin-top: -24px;
    float: left;
    background-size: cover;
    background-position: center;
    @media (max-width: 1000px) {
      height: 300px;
      width: 100vw;
    }
  }
  .postTitle {
    padding: 10px;
    clear: both;
    top: 0;
    @media (min-width: 1000px) {
      margin-left: 600px;
      h1 {
        max-height: 340px !important;
        overflow-y: auto;
      }

      position: absolute;
    }
  }
  .v-divider {
    clear: both;
    @media (min-width: 1000px) {
      position: relative;
      top: -50px;
      margin-left: 600px;
      &::after {
        content: "";
        position: absolute;
        min-width: 100%;
        min-height: 1px;
        margin-top: 48px;
        background-color: #363636;
      }
    }
  }
  .postCredentials {
    margin: 10px;
    height: 32px;
    .timestamp {
      line-height: 32px;
    }
    @media (min-width: 1000px) {
      position: relative;
      top: -50px;
      margin-left: 610px;
      margin-top: 8px;
    }
  }
}
.else {
  .postTitle {
    padding: 10px;
  }
  .postCredentials {
    margin: 10px;
  }
}

.postContent {
  max-width: 100%;
}
</style>