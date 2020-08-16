<template>
  <div class="home">
    <div id="homeWrapper">
      <div class="image"></div>
      <div id="info">
        <h1 class="header">Strona internetowa klasy IIP!</h1>
        <v-card
          outlined
          style="padding: 10px; margin-top: 30px; max-width: 500px; margin-left: auto; margin-right: auto;"
        >
          <p
            style="margin: 0;"
          >{{ drawer ? 'Po więcej funkcji spójrz na menu po lewej' : 'Po więcej funkcji otwórz menu w lewym górnym rogu'}}</p>
        </v-card>
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
  margin-top: -25px;
  height: calc(100vh - 56px);
  text-align: center;
  user-select: none;
  .image {
    position: absolute;
    background-image: url(../assets/school.jpg);
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    filter: blur(2.5px);
  }
  #info {
    position: relative;
    z-index: 2;
    padding: 20px;
    padding-top: 100px;
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
  }
}
</style>
