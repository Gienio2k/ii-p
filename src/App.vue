<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list shaped dense>
        <br />
        <br />
        <div class="login d-flex flex-column">
          <v-avatar :color="avatar">
            <v-icon v-if="!$store.state.loggedIn" x-large>mdi-account-circle</v-icon>
            <p style="color: white;" v-else>{{ $store.state.user.substring(0, 1).toUpperCase() }}</p>
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
        <router-link to="/blog">
          <v-list-item
            @click="activePage = 'Blog'"
            :class="[activePage == 'Blog' ? 'v-list-item--active' : '']"
            link
          >
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Aktualności</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/feedback">
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

      <v-btn
        v-if="$router.currentRoute.name == 'Post' || $router.currentRoute.name == 'CreatePost'"
        style="top: 25px; outline: none;"
        fab
        color="blue darken-2"
        top
        right
        fixed
        @click="handleFab"
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <br />
      <router-view :drawer="drawer" />
    </v-main>
  </v-app>
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "App",

  components: { Login },

  data() {
    return {
      activePage: this.$router.currentRoute.name,
      drawer: null,
    };
  },

  methods: {
    handleFab() {
      this.$router.push("/blog");
    },
    themeChange() {
      if (localStorage.getItem("dark")) {
        localStorage.setItem(
          "dark",
          localStorage.getItem("dark") == "true" ? "false" : "true"
        );
      } else {
        localStorage.setItem("dark", "false");
      }
    },
  },
  created() {
    if (localStorage.getItem("dark")) {
      this.$vuetify.theme.dark =
        localStorage.getItem("dark") == "true" ? true : false;
    }
  },
  computed: {
    avatar() {
      return this.$store.state.loggedIn ? "blue darken-4" : "";
    },
  },
};
</script>

<style lang="scss">
@import "./assets/stroke.scss";

@font-face {
  font-family: RobotoSlab;
  src: url(./assets/RobotoSlab-Regular.ttf);
}

.v-application {
  background-color: var(--v-background-base) !important;
}

.logo {
  color: #1a1a1a;
  font-size: 72px;
  font-family: RobotoSlab;
  margin-top: 45px;
  margin-left: 15px;
  user-select: none;
}

.lightLogo {
  @include stroke(5px, #ffffff);
  color: #0d47a1;
}

.darkLogo {
  @include stroke(5px, #0d47a1);
  color: #ffffff;
}

#themeChangeBtn {
  position: absolute;
  width: 87px;
  padding: 0;
  bottom: 100px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
  @media (max-height: 530px) {
    position: relative;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    top: 35px;
  }
  .themeChangeContents {
    position: absolute;
    .v-icon {
      margin-right: 15px;
    }
  }
}

a {
  text-decoration: unset;
}

.v-list-item {
  margin-bottom: 10px;
}
</style>
