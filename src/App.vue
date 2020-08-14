<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped dense>
        <br />
        <br />
        <div class="login d-flex flex-column">
          <v-avatar :color="avatar">
            <v-icon v-if="!$store.state.loggedIn" x-large>mdi-account-circle</v-icon>
            <p style="color: white;" v-else>***REMOVED******REMOVED*** $store.state.user.substring(0, 1).toUpperCase() ***REMOVED******REMOVED***</p>
          </v-avatar>
          <Login @set-admin-page="activePage = 'AdminPanel'" />
        </div>
        <v-divider></v-divider>
        <br />
        <router-link to="/">
          <v-list-item
            @click="activePage = 'Home'"
            :class="[activePage == 'Home' ? 'v-list-item--active' : '']"
            link
          >
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Główna</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="feedback">
          <v-list-item
            @click="activePage = 'Feedback'"
            :class="[activePage == 'Feedback' ? 'v-list-item--active' : '']"
            id="itemFeedback"
            link
          >
            <v-list-item-action>
              <v-icon>mdi-comment-quote</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item id="themeChangeBtn">
          <v-list-item-action>
            <div class="themeChangeContents d-flex flex-row">
              <v-icon>mdi-brightness-4</v-icon>
              <v-switch inset @click="themeChange" icon v-model="$vuetify.theme.dark"></v-switch>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="blue darken-4">
      <v-app-bar-nav-icon dark large @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h1 :class="[$vuetify.theme.dark ? 'darkLogo' : 'lightLogo', 'logo']">IIP</h1>
    </v-app-bar>

    <v-main>
      <br />
      <router-view :drawer="drawer" />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login.vue";

export default ***REMOVED***
  name: "App",

  components: ***REMOVED*** Login ***REMOVED***,

  data() ***REMOVED***
    return ***REMOVED***
      activePage: this.$router.currentRoute.name,
      drawer: null,
    ***REMOVED***;
  ***REMOVED***,

  methods: ***REMOVED***
    themeChange() ***REMOVED***
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
  computed: ***REMOVED***
    avatar: function () ***REMOVED***
      return this.$store.state.loggedIn ? "blue darken-4" : "";
    ***REMOVED***,
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

.lightLogo ***REMOVED***
  @include stroke(5px, #ffffff);
  color: #0d47a1;
***REMOVED***

.darkLogo ***REMOVED***
  @include stroke(5px, #0d47a1);
  color: #ffffff;
***REMOVED***

#themeChangeBtn ***REMOVED***
  position: absolute;
  width: 87px;
  padding: 0;
  bottom: 100px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  @media (max-height: 530px) ***REMOVED***
    position: relative;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    top: 35px;
  ***REMOVED***
  .themeChangeContents ***REMOVED***
    position: absolute;
    .v-icon ***REMOVED***
      margin-right: 15px;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

a ***REMOVED***
  text-decoration: unset;
***REMOVED***

.v-list-item ***REMOVED***
  margin-bottom: 10px;
***REMOVED***
</style>
