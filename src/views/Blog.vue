<template>
  <div>
    <div class="image"></div>
    <div class="blog">
      <div class="header">
        <h1>Aktualności</h1>
        <div class="d-flex flex-column align-end">
          <v-btn class="addBtn" depressed v-if="$store.state.loggedIn">
            <v-icon left>mdi-pencil</v-icon>napisz post
          </v-btn>
        </div>
      </div>
      <div class="posts">
        <div v-if="loading">
          <v-skeleton-loader
            class="mx-auto"
            v-for="num in [1,2,3,4,5]"
            max-width="500"
            max-height="300"
            type="card"
            :key="num"
          ></v-skeleton-loader>
        </div>
        <post
          v-else
          v-for="{timestamp,title, content, image, author} in posts"
          :timestamp="timestamp"
          :title="title"
          :content="content"
          :author="author"
          :image="image"
          :key="timestamp"
        ></post>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import * as firebase from "firebase/app";
import "firebase/firestore";

export default {
  name: "Blog",
  components: { Post },
  data() {
    return {
      posts: [],
      loading: true,
    };
  },
  created() {
    firebase
      .firestore()
      .collection("blog")
      .doc("posts")
      .collection("published")
      .orderBy("timestamp")
      .limit(10)
      .onSnapshot(
        (docSnapshot) => {
          let posts = [];
          docSnapshot.forEach((doc) => {
            posts.push({
              timestamp: doc.data().timestamp.toDate().getTime(),
              title: doc.data().title,
              content: doc.data().content,
              author: doc.data().author,
              image: doc.data().image,
            });
          });
          this.posts = posts.reverse();
          this.loading = false;
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
  },
};
</script>

<style lang='scss'>
@import "../assets/stroke.scss";

.image {
  position: fixed;
  background-image: url(../assets/school.jpg);
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
  filter: blur(2.5px);
  margin-top: -25px;
}

.blog {
  position: relative;
  z-index: 2;
  padding: 40px;
  .header {
    h1 {
      text-align: center;
      -webkit-text-stroke: 1px black;
      text-shadow: 2px 2px 9px rgba(0, 0, 0, 1);
      color: white;

      margin-bottom: 20px;
    }
    .addBtn {
      margin-right: -20px;
      @media (max-width: 670px) {
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
  .v-skeleton-loader {
    background-color: #393939b6;
    margin-top: 20px;
    opacity: 1;
    .v-skeleton-loader__image {
      max-height: 100px;
    }
  }
}
</style>