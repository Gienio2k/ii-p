<template
  >
  <div>
    <v-dialog
      v-if="!$store.state.loggedIn"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="loginDialog"
    >
      <template v-slot:activator="***REMOVED*** on, attrs ***REMOVED***">
        <v-btn block outlined class="loginBtn" v-bind="attrs" v-on="on" @click="tab = 0">zaloguj się</v-btn>
        <v-btn
          block
          outlined
          class="signupBtn"
          v-bind="attrs"
          v-on="on"
          @click="tab = 1"
        >utwórz konto</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="blue darken-4">
          <v-btn icon dark @click="loginDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-tabs v-model="tab">
            <v-tab>ZALOGUJ SIĘ</v-tab>
            <v-tab>UTWÓRZ KONTO</v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-form ref="loginForm" class="loginForm" v-model="loginValid">
              <v-card outlined class="loginCard">
                <v-icon class="decorativeLoginIcon" x-large>mdi-account-circle</v-icon>
                <v-text-field
                  label="Login"
                  @keydown="loginErrorText = 'Wpisz login'"
                  class="loginField"
                  v-model="loginUsername"
                  :rules="loginRules"
                >
                  <v-icon slot="prepend">mdi-account</v-icon>
                </v-text-field>
                <v-text-field
                  label="Hasło"
                  @keyup.enter="login"
                  @keydown="passwdErrorText = 'Wpisz hasło'"
                  type="password"
                  class="loginPasswdField"
                  v-model="loginPasswd"
                  :rules="loginPasswdRules"
                >
                  <v-icon slot="prepend">mdi-lock</v-icon>
                </v-text-field>
                <v-btn
                  :loading="loginBtnLoading"
                  id="loginBtn"
                  @click="login"
                  color="green"
                  dark
                >ZALOGUJ SIĘ</v-btn>
              </v-card>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="signupForm" class="signupForm" v-model="signupValid">
              <v-card outlined class="signupCard">
                <v-icon class="decorativeSignupIcon" x-large>mdi-account-circle</v-icon>
                <v-text-field
                  label="Login"
                  class="signupField"
                  v-model="signupLogin"
                  :rules="loginRules"
                >
                  <v-icon slot="prepend">mdi-account</v-icon>
                </v-text-field>
                <v-text-field
                  label="Hasło"
                  type="password"
                  class="signupPasswdField"
                  v-model="signupPasswd"
                  :rules="signupPasswdRules"
                >
                  <v-icon slot="prepend">mdi-lock</v-icon>
                </v-text-field>
                <v-text-field
                  label="Powtórz hasło"
                  @keyup.enter="signup"
                  type="password"
                  class="signupConfirmPasswdField"
                  v-model="signupConfirmPasswd"
                  :rules="signupConfirmPasswdRules"
                >
                  <v-icon slot="prepend">mdi-lock-check</v-icon>
                </v-text-field>
                <v-btn
                  :loading="signupBtnLoading"
                  id="signupBtn"
                  @click="signup"
                  color="blue"
                  dark
                >UTWÓRZ KONTO</v-btn>
              </v-card>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <div class="account" v-else>
      <strong class="d-flex flex-column">***REMOVED******REMOVED*** rank ***REMOVED******REMOVED***</strong>
      <v-chip>
        <p>***REMOVED******REMOVED*** $store.state.user ***REMOVED******REMOVED***</p>
      </v-chip>
      <v-btn class="signupBtn d-flex flex-column" @click="signout">WYLOGUJ</v-btn>
    </div>
    <v-btn
      v-if="$store.state.userRank == 'admin'"
      class="adminBtn"
      @click="() => ***REMOVED***$router.push('/admin'); $emit('set-admin-page')***REMOVED***"
    >ADMIN PANEL</v-btn>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default ***REMOVED***
  name: "Login",
  data() ***REMOVED***
    return ***REMOVED***
      loginBtnLoading: false,
      signupBtnLoading: false,
      tab: 0,
      loginDialog: false,
      loginValid: false,
      loginUsername: "",
      passwdErrorText: "Wpisz hasło",
      loginErrorText: "Wpisz login",
      loginPasswd: "",
      loginRules: [
        (v) => !!v || this.loginErrorText,
        (v) => !v.includes(" ") || "Login nie może zawierać spacji",
        (v) => !v.includes("@") || "Login nie może zawierać @",
      ],
      loginPasswdRules: [(v) => !!v || this.passwdErrorText],
      signupPasswdRules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v.length >= 6 || "Hasło musi mieć co najmniej 6 znaków",
      ],
      signupValid: false,
      signupLogin: "",
      signupPasswd: "",
      signupConfirmPasswd: "",
      signupConfirmPasswdRules: [
        (v) => !!v || "Wpisz hasło",
        (v) => v == this.signupPasswd || "Hasła się nie zgadzają",
      ],
    ***REMOVED***;
  ***REMOVED***,

  methods: ***REMOVED***
    login() ***REMOVED***
      let altThis = this;
      if (this.$refs.loginForm.validate()) ***REMOVED***
        this.loginBtnLoading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.loginUsername + "@ii-p.com",
            this.loginPasswd
          )
          .catch(function (error) ***REMOVED***
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/wrong-password") ***REMOVED***
              altThis.loginPasswd = "";
              altThis.passwdErrorText = "Niepoprawne hasło";
            ***REMOVED*** else if (errorCode == "auth/too-many-requests") ***REMOVED***
              altThis.loginPasswd = "";
              altThis.passwdErrorText =
                "Zbyt dużo niepomyślnych logowań, spróbuj ponownie za kilkanaście sekund";
            ***REMOVED*** else if (errorCode == "auth/user-not-found") ***REMOVED***
              altThis.loginUsername = "";
              altThis.loginErrorText = "Nie znaleziono takiego użytkownika";
            ***REMOVED*** else ***REMOVED***
              altThis.passwdErrorText = `Nieoczekiwany błąd: $***REMOVED***errorCode***REMOVED***. Zgłoś problem do programisty`;
            ***REMOVED***
            console.error(errorCode, "\n", errorMessage);
          ***REMOVED***)
          .then(() => ***REMOVED***
            this.loginBtnLoading = false;
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***,
    signup() ***REMOVED***
      let altThis = this;
      if (this.$refs.signupForm.validate()) ***REMOVED***
        this.signupBtnLoading = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signupLogin + "@ii-p.com",
            this.signupPasswd
          )
          .catch(function (error) ***REMOVED***
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") ***REMOVED***
              altThis.signupLogin = "";
              altThis.loginErrorText = "Podany login jest zajęty";
            ***REMOVED***
            console.error(errorCode, "\n", errorMessage);
            return;
          ***REMOVED***)
          .then(() => ***REMOVED***
            this.signupBtnLoading = false;
            firebase
              .database()
              .ref(
                "/users/" +
                  firebase
                    .auth()
                    .currentUser.email.substring(
                      firebase.auth().currentUser.email.length - 9,
                      0
                    )
              )
              .update(***REMOVED*** rank: "user" ***REMOVED***);
          ***REMOVED***);
      ***REMOVED***
    ***REMOVED***,
    signout() ***REMOVED***
      firebase.auth().signOut();
    ***REMOVED***,
  ***REMOVED***,
  created() ***REMOVED***
    let altThis = this;
    firebase.auth().onAuthStateChanged((firebaseUser) => ***REMOVED***
      if (firebaseUser) ***REMOVED***
        this.$store.commit("setState", ***REMOVED*** name: "loggedIn", val: true ***REMOVED***);
        this.$store.commit("setState", ***REMOVED***
          name: "user",
          val: firebaseUser.email.substring(firebaseUser.email.length - 9, 0),
        ***REMOVED***);
        firebase
          .database()
          .ref(
            "/users/" +
              firebaseUser.email.substring(firebaseUser.email.length - 9, 0) +
              "/rank"
          )
          .on("value", function (snapshot) ***REMOVED***
            altThis.$store.commit("setState", ***REMOVED***
              name: "userRank",
              val: snapshot.val(),
            ***REMOVED***);
          ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        this.$store.commit("setState", ***REMOVED*** name: "loggedIn", val: false ***REMOVED***);
        this.$store.commit("setState", ***REMOVED*** name: "user", val: "" ***REMOVED***);
        this.$store.commit("setState", ***REMOVED***
          name: "userRank",
          val: "",
        ***REMOVED***);
      ***REMOVED***
      this.loginUsername = "";
      this.loginPasswd = "";
      this.signupLogin = "";
      this.signupPasswd = "";
      this.signupConfirmPasswd = "";
      this.loginDialog = false;
    ***REMOVED***);
  ***REMOVED***,
  computed: ***REMOVED***
    rank: function () ***REMOVED***
      switch (this.$store.state.userRank) ***REMOVED***
        case "user":
          return "Użytkownik";
        case "admin":
          return "Administrator";
      ***REMOVED***
      return "";
    ***REMOVED***,
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
  .loginBtn ***REMOVED***
    margin-top: 10px;
  ***REMOVED***
  .signupBtn ***REMOVED***
    margin-top: 10px;
  ***REMOVED***
***REMOVED***

.v-slide-group__prev ***REMOVED***
  position: absolute;
***REMOVED***

.loginForm,
.signupForm ***REMOVED***
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
  .decorativeLoginIcon,
  .decorativeSignupIcon ***REMOVED***
    margin-left: -20px;
    margin-bottom: 40px;
    margin-top: -40px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    transform: scale(200%);
  ***REMOVED***
***REMOVED***
.loginCard,
.signupCard ***REMOVED***
  padding: 20px;
***REMOVED***
.account ***REMOVED***
  text-align: center;
  p ***REMOVED***
    font-size: 20px;
    padding-top: 13px;
  ***REMOVED***
  .v-chip ***REMOVED***
    margin-top: 10px;
  ***REMOVED***
  .v-btn ***REMOVED***
    margin-top: 20px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  ***REMOVED***
***REMOVED***

.adminBtn ***REMOVED***
  margin-top: 10px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
***REMOVED***
</style>
