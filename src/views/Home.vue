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
          >***REMOVED******REMOVED*** drawer ? 'Po więcej funkcji spójrz na menu po lewej' : 'Po więcej funkcji otwórz menu w lewym górnym rogu'***REMOVED******REMOVED***</p>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default ***REMOVED***
  name: "Home",
  components: ***REMOVED******REMOVED***,
  props: ["drawer"],
***REMOVED***;
</script>

<style scoped lang="scss">
@import "../assets/stroke.scss";

#homeWrapper ***REMOVED***
  margin-top: -25px;
  height: calc(100vh - 56px);
  text-align: center;
  user-select: none;
  .image ***REMOVED***
    position: absolute;
    background-image: url(../assets/school.jpg);
    background-size: cover;
    background-position: center;
    height: 100%;
    width: 100%;
    filter: blur(2.5px);
  ***REMOVED***
  #info ***REMOVED***
    position: relative;
    z-index: 2;
    padding: 20px;
    padding-top: 100px;
    background-color: transparent;
    .header ***REMOVED***
      width: inherit;
      font-size: 50px;
      line-height: 120%;
      color: white;
      @include stroke(3px, #0d47a1);
    ***REMOVED***
    p ***REMOVED***
      margin-top: 20px;
    ***REMOVED***
  ***REMOVED***
***REMOVED***
</style>
