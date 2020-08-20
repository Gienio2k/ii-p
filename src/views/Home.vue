<template>
  <div class="home">
    <div id="homeWrapper">
      <div class="image"></div>
      <div id="info">
        <h1 class="header">Strona internetowa klasy IIP!</h1>
        <div class="cardContainer">
          <v-card class="card" :class="[$vuetify.theme.dark ? 'darkCard' : 'lightCard']">
            <div class="cardHeader">
              <v-icon x-large>mdi-newspaper</v-icon>
              <h2>Aktualności</h2>
              <p>Bądź na bieżąco</p>
              <router-link to="/blog">
                <v-btn outlined @click="$emit('set-active-page', 'Blog')">Idź</v-btn>
              </router-link>
            </div>
          </v-card>
          <v-card
            style="float:right; margin-bottom: 80px;"
            class="card"
            :class="[$vuetify.theme.dark ? 'darkCard' : 'lightCard']"
          >
            <div class="cardHeader">
              <v-icon x-large>mdi-comment-quote</v-icon>
              <h2>Feedback</h2>
              <p>Wyślij wiadomość do przewodniczącego</p>
              <router-link to="/feedback">
                <v-btn outlined @click="$emit('set-active-page', 'Feedback')">Idź</v-btn>
              </router-link>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  props: ["drawer"],
};
</script>

<style scoped lang="scss">
@import "../assets/stroke.scss";

#homeWrapper {
  height: calc(100vh - 56px);
  text-align: center;
  user-select: none;
  .image {
    position: fixed;
    background-image: url(../assets/school.jpg);
    background-size: cover;
    background-position: center;
    height: 100vh;
    width: 100vw;
    filter: blur(2.5px);
  }
  #info {
    position: relative;
    z-index: 2;
    padding: 20px;
    padding-top: 50px;
    background-color: transparent;
    .header {
      width: inherit;
      font-size: 50px;
      line-height: 120%;
      color: white;
      @include stroke(3px, #0d47a1);
    }
    p {
      margin-top: 20px;
    }
    .card {
      margin-top: 40px;
      padding: 15px;
      text-align: left;
      width: 100%;
      max-width: 400px;
      @media (min-width: 705px) {
        margin-left: 20%;
        margin-right: 20%;
      }
      .v-icon {
        float: left;
      }
      h2 {
        line-height: 40px;
        margin-left: 50px;
        text-align: center;
      }
      p {
        text-align: center;
      }
      .v-btn {
        margin-top: 10px;
        left: 50%;
        right: 50%;
        transform: translateX(-50%);
      }
    }
    .lightCard {
      background-color: #ffffff9f;
    }
    .darkCard {
      background-color: #0000009f;
    }
  }
}
</style>
