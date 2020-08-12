<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <br />
        <br />
        <div class="login d-flex flex-column">
          <v-avatar>
            <v-icon x-large>mdi-account-circle</v-icon>
          </v-avatar>

          <v-dialog
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            v-model="login_dialog"
          >
            <template v-slot:activator="***REMOVED*** on, attrs ***REMOVED***">
              <v-btn
                outlined
                class="signup_btn"
                v-bind="attrs"
                v-on="on"
                @click="tab = 1"
              >utwórz konto</v-btn>
              <v-btn
                outlined
                color="login_btn"
                v-bind="attrs"
                v-on="on"
                @click="tab = 0"
              >zaloguj się</v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="blue darken-4">
                <v-btn icon dark @click="login_dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-tabs v-model="tab">
                  <v-tab>ZALOGUJ SIĘ</v-tab>
                  <v-tab>UTWÓRZ KONTO</v-tab>
                </v-tabs>
              </v-toolbar>

              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-form class="login_form" v-model="login_valid">
                    <v-card outlined class="login_card">
                      <v-icon class="decorative_login_icon" x-large>mdi-account-circle</v-icon>
                      <v-text-field
                        label="Login"
                        class="login_field"
                        v-model="login"
                        :rules="login_rules"
                      >
                        <v-icon slot="prepend">mdi-account</v-icon>
                      </v-text-field>
                      <v-text-field
                        label="Hasło"
                        type="password"
                        class="login_passwd_field"
                        v-model="login_passwd"
                        :rules="login_passwd_rules"
                      >
                        <v-icon slot="prepend">mdi-lock</v-icon>
                      </v-text-field>
                      <v-btn color="green" dark>ZALOGUJ SIĘ</v-btn>
                    </v-card>
                  </v-form>
                </v-tab-item>
                <v-tab-item>
                  <v-form class="signup_form" v-model="signup_valid">
                    <v-card outlined class="signup_card">
                      <v-icon class="decorative_signup_icon" x-large>mdi-account-circle</v-icon>
                      <v-text-field
                        label="Login"
                        class="signup_field"
                        v-model="signup"
                        :rules="login_rules"
                      >
                        <v-icon slot="prepend">mdi-account</v-icon>
                      </v-text-field>
                      <v-text-field
                        label="Hasło"
                        type="password"
                        class="signup_passwd_field"
                        v-model="signup_passwd"
                        :rules="login_passwd_rules"
                      >
                        <v-icon slot="prepend">mdi-lock</v-icon>
                      </v-text-field>
                      <v-text-field
                        label="Powtórz hasło"
                        type="password"
                        class="signup_passwd2_field"
                        v-model="signup_passwd2"
                        :rules="signup_passwd2_rules"
                      >
                        <v-icon slot="prepend">mdi-lock-check</v-icon>
                      </v-text-field>
                      <v-btn color="blue" dark>UTWÓRZ KONTO</v-btn>
                    </v-card>
                  </v-form>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
          </v-dialog>
        </div>
        <v-divider></v-divider>
        <br />
        <router-link to="/">
          <v-list-item
            @click="active_page = 'Home'"
            :class="[active_page == 'Home' ? 'v-list-item--active' : '']"
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
            @click="active_page = 'Feedback'"
            :class="[active_page == 'Feedback' ? 'v-list-item--active' : '']"
            id="item_feedback"
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
      active_page: this.$router.currentRoute.name,
      drawer: null,
      tab: 0,
      login_dialog: null,
      login_valid: false,
      login: "",
      login_passwd: "",
      login_rules: [
        (v) => !!v || "Wpisz login",
        (v) => !v.includes(" ") || "Login nie może zawierać spacji",
      ],
      login_passwd_rules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v.length >= 6 || "Hasło musi mieć co najmniej 6 znaków",
      ],
      signup_valid: false,
      signup: "",
      signup_passwd: "",
      signup_passwd2: "",
      signup_passwd2_rules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v == this.signup_passwd || "Hasła się nie zgadzają",
      ],
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

.login ***REMOVED***
  margin: 20px;
  margin-top: 0px;
  .v-avatar ***REMOVED***
    transform: scale(150%);
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
  ***REMOVED***
  .login_btn ***REMOVED***
    float: left;
  ***REMOVED***
  .signup_btn ***REMOVED***
    margin-top: 10px;
  ***REMOVED***
***REMOVED***

.v-slide-group__prev ***REMOVED***
  position: absolute;
***REMOVED***

.login_form,
.signup_form ***REMOVED***
  position: relative;
  margin-top: calc(50vh - 200px);
  width: 300px;
  left: 50%;
  right: 50%;
  transform: translate(-50%);
  .v-text-field ***REMOVED***
    max-width: 300px;
  ***REMOVED***
  .v-btn ***REMOVED***
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
  ***REMOVED***
  .decorative_login_icon,
  .decorative_signup_icon ***REMOVED***
    margin-left: -20px;
    margin-bottom: 40px;
    margin-top: -40px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    transform: scale(200%);
  ***REMOVED***
***REMOVED***
.login_card,
.signup_card ***REMOVED***
  padding: 20px;
***REMOVED***
</style>
