<template
  ><div>
    <v-dialog
      v-if="!$store.state.logged_in"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="login_dialog"
    >
      <template v-slot:activator="***REMOVED*** on, attrs ***REMOVED***">
        <v-btn
          block
          outlined
          class="login_btn"
          v-bind="attrs"
          v-on="on"
          @click="tab = 0"
          >zaloguj się</v-btn
        ><v-btn
          block
          outlined
          class="signup_btn"
          v-bind="attrs"
          v-on="on"
          @click="tab = 1"
          >utwórz konto</v-btn
        >
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
            <v-form ref="login_form" class="login_form" v-model="login_valid">
              <v-card outlined class="login_card">
                <v-icon class="decorative_login_icon" x-large
                  >mdi-account-circle</v-icon
                >
                <v-text-field
                  label="Login"
                  @keydown="login_err_txt = 'Wpisz login'"
                  class="login_field"
                  v-model="login_login"
                  :rules="login_rules"
                >
                  <v-icon slot="prepend">mdi-account</v-icon>
                </v-text-field>
                <v-text-field
                  label="Hasło"
                  @keydown="passwd_err_txt = 'Wpisz hasło'"
                  type="password"
                  class="login_passwd_field"
                  v-model="login_passwd"
                  :rules="login_passwd_rules"
                >
                  <v-icon slot="prepend">mdi-lock</v-icon>
                </v-text-field>
                <v-btn @click="login" color="green" dark>ZALOGUJ SIĘ</v-btn>
              </v-card>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form
              ref="signup_form"
              class="signup_form"
              v-model="signup_valid"
            >
              <v-card outlined class="signup_card">
                <v-icon class="decorative_signup_icon" x-large
                  >mdi-account-circle</v-icon
                >
                <v-text-field
                  label="Login"
                  class="signup_field"
                  v-model="signup_login"
                  :rules="login_rules"
                >
                  <v-icon slot="prepend">mdi-account</v-icon>
                </v-text-field>
                <v-text-field
                  label="Hasło"
                  type="password"
                  class="signup_passwd_field"
                  v-model="signup_passwd"
                  :rules="signup_passwd_rules"
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
                <v-btn @click="signup" color="blue" dark>UTWÓRZ KONTO</v-btn>
              </v-card>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <div class="account" v-else>
      <p>***REMOVED******REMOVED*** $store.state.user ***REMOVED******REMOVED***</p>
      <v-btn class="signout_btn" @click="signout">WYLOGUJ</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default ***REMOVED***
  name: "Login",
  data() ***REMOVED***
    return ***REMOVED***
      snack_text: "HELEOF",
      tab: 0,
      login_dialog: false,
      login_valid: false,
      login_login: "",
      passwd_err_txt: "Wpisz hasło",
      login_err_txt: "Wpisz login",
      login_passwd: "",
      login_rules: [
        (v) => !!v || this.login_err_txt,
        (v) => !v.includes(" ") || "Login nie może zawierać spacji",
        (v) => !v.includes("@") || "Login nie może zawierać @",
      ],
      login_passwd_rules: [(v) => !!v || this.passwd_err_txt],
      signup_passwd_rules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v.length >= 6 || "Hasło musi mieć co najmniej 6 znaków",
      ],
      signup_valid: false,
      signup_login: "",
      signup_passwd: "",
      signup_passwd2: "",
      signup_passwd2_rules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v == this.signup_passwd || "Hasła się nie zgadzają",
      ],
    ***REMOVED***;
  ***REMOVED***,

  methods: ***REMOVED***
    login() ***REMOVED***
      let alt_this = this;
      if (this.$refs.login_form.validate()) ***REMOVED***
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.login_login + "@ii-p.com",
            this.login_passwd
          )
          .catch(function(error) ***REMOVED***
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/wrong-password") ***REMOVED***
              alt_this.login_passwd = "";
              alt_this.passwd_err_txt = "Niepoprawne hasło";
            ***REMOVED*** else if (errorCode == "auth/too-many-requests") ***REMOVED***
              alt_this.login_passwd = "";
              alt_this.passwd_err_txt =
                "Zbyt dużo niepomyślnych logowań, spróbuj ponownie za kilkanaście sekund";
            ***REMOVED*** else if (errorCode == "auth/user-not-found") ***REMOVED***
              alt_this.login_login = "";
              alt_this.login_err_txt = "Nie znaleziono takiego użytkownika";
            ***REMOVED*** else ***REMOVED***
              alt_this.passwd_err_txt = `Nieoczekiwany błąd: $***REMOVED***errorCode***REMOVED***. Zgłoś problem do programisty`;
            ***REMOVED***
            console.error(errorCode, "\n", errorMessage);
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***,
    signup() ***REMOVED***
      if (this.$refs.signup_form.validate()) ***REMOVED***
        let alt_this = this;
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signup_login + "@ii-p.com",
            this.signup_passwd
          )
          .catch(function(error) ***REMOVED***
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") ***REMOVED***
              alt_this.signup_login = "";
              alt_this.login_err_txt = "Podany login jest zajęty";
            ***REMOVED***
            console.error(errorCode, "\n", errorMessage);
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***,
    signout() ***REMOVED***
      firebase.auth().signOut();
    ***REMOVED***,
  ***REMOVED***,
  created() ***REMOVED***
    firebase.auth().onAuthStateChanged((firebaseUser) => ***REMOVED***
      if (firebaseUser) ***REMOVED***
        this.$store.commit("setState", ***REMOVED*** name: "logged_in", val: true ***REMOVED***);
        this.$store.commit("setState", ***REMOVED***
          name: "user",
          val: firebaseUser.email.substring(firebaseUser.email.length - 9, 0),
        ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        this.$store.commit("setState", ***REMOVED*** name: "logged_in", val: false ***REMOVED***);
        this.$store.commit("setState", ***REMOVED*** name: "user", val: "" ***REMOVED***);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
.login ***REMOVED***
  margin: 20px;
  margin-top: 0px;
  .v-avatar ***REMOVED***
    transform: scale(150%);
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    font-size: 35px;
    padding-top: 15px;
  ***REMOVED***
  .login_btn ***REMOVED***
    margin-top: 10px;
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
.account ***REMOVED***
  text-align: center;
***REMOVED***
</style>
