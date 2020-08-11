<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <br />
        <br />
        <router-link to="/">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Główna</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="feedback">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-comment-quote</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item id="theme_change_btn">
          <v-list-item-action>
            <div class="theme_change_contents">
              <v-switch inset @click="theme_change" icon v-model="$vuetify.theme.dark"></v-switch>
              <v-icon>mdi-brightness-4</v-icon>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="blue darken-4">
      <v-app-bar-nav-icon dark large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h1 :class="[$vuetify.theme.dark ? 'dark_logo' : 'light_logo', 'logo']">IIP</h1>
    </v-app-bar>

    <v-main>
      <br />
      <router-view :drawer="drawer" />
    </v-main>
  </v-app>
</template>

<script>
export default ***REMOVED***
  name: "App",

  components: ***REMOVED******REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      drawer: null,
    ***REMOVED***;
  ***REMOVED***,

  methods: ***REMOVED***
    theme_change() ***REMOVED***
      if (localStorage.getItem("dark")) ***REMOVED***
        localStorage.setItem(
          "dark",
          localStorage.getItem("dark") == "true" ? "false" : "true"
        );
      ***REMOVED*** else ***REMOVED***
        localStorage.setItem("dark", "false");
      ***REMOVED***
    ***REMOVED***,
  ***REMOVED***,
  created() ***REMOVED***
    if (localStorage.getItem("dark")) ***REMOVED***
      this.$vuetify.theme.dark =
        localStorage.getItem("dark") == "true" ? true : false;
    ***REMOVED***
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
@import "./assets/stroke.scss";

@font-face ***REMOVED***
  font-family: RobotoSlab;
  src: url(./assets/RobotoSlab-Regular.ttf);
***REMOVED***

.v-application ***REMOVED***
  background-color: var(--v-background-base) !important;
***REMOVED***

.logo ***REMOVED***
  color: #1a1a1a;
  font-size: 72px;
  font-family: RobotoSlab;
  margin-top: 45px;
  margin-left: 15px;
  user-select: none;
***REMOVED***

.light_logo ***REMOVED***
  @include stroke(5px, #ffffff);
  color: #0d47a1;
***REMOVED***

.dark_logo ***REMOVED***
  @include stroke(5px, #0d47a1);
  color: #ffffff;
***REMOVED***

#theme_change_btn ***REMOVED***
  position: absolute;
  bottom: 100px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
***REMOVED***

.theme_change_contents ***REMOVED***
  position: absolute;
  left: -100%;
  .v-input ***REMOVED***
    position: absolute;
    left: 40px;
  ***REMOVED***
  .v-icon ***REMOVED***
    position: absolute;
    top: -2px;
  ***REMOVED***
***REMOVED***

a ***REMOVED***
  text-decoration: unset;
***REMOVED***
</style>
