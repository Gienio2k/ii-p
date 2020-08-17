<template>
  <v-card class="post" :class="'post' + timestamp">
    <div
      @click="seePost"
      class="titleImage"
      v-if="image"
      :style="'background-image: url(\'' + image + '\');'"
    />
    <h2 @click="seePost" class="title">{{title}}</h2>
    <v-divider></v-divider>
    <div class="wrapper">
      <div class="credentials d-flex flex-row">
        <v-chip pill>
          <v-avatar left size="25" color="blue darken-4">
            <p style="color: white; margin-top: 15px">{{ author.substring(0,1).toUpperCase() }}</p>
          </v-avatar>
          {{author}}
        </v-chip>
        <v-spacer></v-spacer>
        <p class="timestamp">{{timestampDate}}</p>
      </div>
      <div class="content ql-editor" v-html="content"></div>
      <div class="tooLarge" v-if="tooLarge">
        <v-btn @click="seePost" dark outlined>czytaj więcej</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
//import dateParse from "../utils/dateParse";

export default {
  name: "Post",
  props: ["timestamp", "title", "content", "author", "image"],

  data() {
    return {
      tooLarge: false,
    };
  },
  computed: {
    timestampDate() {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(this.timestamp).toLocaleDateString("pl-pl", options);
    },
  },
  mounted() {
    if (this.content.length > 270) {
      this.tooLarge = true;
    }
  },
  methods: {
    seePost() {
      this.$store.commit("setState", {
        name: "scroll",
        val: document.querySelector("html").scrollTop + 56,
      });
      this.$router.push("/blog/post/" + this.timestamp);
    },
  },
};
</script>

<style lang='scss'>
@import url(https://cdn.bootcss.com/quill/1.3.6/quill.snow.min.css);

.post {
  margin-top: 20px;
  .title {
    font-size: 30px !important;
    padding: 10px;
    cursor: pointer;
    user-select: none;
  }
  .wrapper {
    padding: 10px;
  }
  .author {
    margin-top: 15px;
  }
  .titleImage {
    height: 25vw;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .content {
    max-height: 175px;
    overflow: hidden !important;
    user-select: none;
    cursor: pointer !important;
  }
  .credentials {
    height: 32px;
    .timestamp {
      line-height: 32px;
    }
    margin-bottom: 20px;
  }
  .tooLarge {
    position: relative;
    z-index: 3;
    margin: -10px;
    height: 75px;
    margin-top: -60px;
    border-radius: 4px;
    background-image: linear-gradient(transparent, 40%, #727272);
    .v-btn {
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      margin-top: 25px;
      background-color: #727272;
    }
  }
}
</style>