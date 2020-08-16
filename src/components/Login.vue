<template>
  <div>
    <v-dialog
      v-if="!$store.state.loggedIn"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="loginDialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          outlined
          class="loginBtn"
          v-bind="attrs"
          v-on="on"
          @click="tab = 0"
          >zaloguj się</v-btn
        >
        <v-btn
          block
          outlined
          class="signupBtn"
          v-bind="attrs"
          v-on="on"
          @click="tab = 1"
          >utwórz konto</v-btn
        >
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
                <v-icon class="decorativeLoginIcon" x-large
                  >mdi-account-circle</v-icon
                >
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
                  >ZALOGUJ SIĘ</v-btn
                >
              </v-card>
            </v-form>
          </v-tab-item>
          <v-tab-item>
            <v-form ref="signupForm" class="signupForm" v-model="signupValid">
              <v-card outlined class="signupCard">
                <v-icon class="decorativeSignupIcon" x-large
                  >mdi-account-circle</v-icon
                >
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
                  >UTWÓRZ KONTO</v-btn
                >
              </v-card>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
    <div class="account" v-else>
      <strong class="d-flex flex-column">{{ rank }}</strong>
      <v-chip>
        <p>{{ $store.state.user }}</p>
      </v-chip>
      <v-btn class="signupBtn d-flex flex-column" @click="signout"
        >WYLOGUJ</v-btn
      >
    </div>
    <v-btn
      v-if="$store.state.userRank == 'admin'"
      class="adminBtn"
      @click="
        () => {
          $router.push('/admin');
          $emit('set-admin-page');
        }
      "
      >ADMIN PANEL</v-btn
    >
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: "Login",
  data() {
    return {
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
    };
  },

  methods: {
    login() {
      let altThis = this;
      if (this.$refs.loginForm.validate()) {
        this.loginBtnLoading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(
            this.loginUsername + "@ii-p.com",
            this.loginPasswd
          )
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/wrong-password") {
              altThis.loginPasswd = "";
              altThis.passwdErrorText = "Niepoprawne hasło";
            } else if (errorCode == "auth/too-many-requests") {
              altThis.loginPasswd = "";
              altThis.passwdErrorText =
                "Zbyt dużo niepomyślnych logowań, spróbuj ponownie za kilkanaście sekund";
            } else if (errorCode == "auth/user-not-found") {
              altThis.loginUsername = "";
              altThis.loginErrorText = "Nie znaleziono takiego użytkownika";
            } else {
              altThis.passwdErrorText = `Nieoczekiwany błąd: ${errorCode}. Zgłoś problem do programisty`;
            }
            console.error(errorCode, "\n", errorMessage);
          })
          .then(() => {
            this.loginBtnLoading = false;
          });
      }
    },
    signup() {
      let altThis = this;
      if (this.$refs.signupForm.validate()) {
        this.signupBtnLoading = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.signupLogin + "@ii-p.com",
            this.signupPasswd
          )
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") {
              altThis.signupLogin = "";
              altThis.loginErrorText = "Podany login jest zajęty";
            }
            console.error(errorCode, "\n", errorMessage);
            return;
          })
          .then(() => {
            this.signupBtnLoading = false;
            firebase
              .firestore()
              .collection("users")
              .doc()
              .set({
                rank: "user",
                username: firebase
                  .auth()
                  .currentUser.email.substring(
                    firebase.auth().currentUser.email.length - 9,
                    0
                  ),
              });
          });
      }
    },
    signout() {
      firebase.auth().signOut();
    },
  },
  created() {
    let altThis = this;
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        let username = firebaseUser.email.substring(
          firebaseUser.email.length - 9,
          0
        );
        this.$store.commit("setState", { name: "loggedIn", val: true });
        this.$store.commit("setState", {
          name: "user",
          val: username,
        });
        firebase
          .firestore()
          .collection("users")
          .where("username", "==", username)
          .onSnapshot(
            (querySnapshot) => {
              querySnapshot.forEach(function(doc) {
                altThis.$store.commit("setState", {
                  name: "userRank",
                  val: doc.data().rank,
                });
              });
            },
            (err) => {
              console.log(`Encountered error: ${err}`);
            }
          );
      } else {
        this.$store.commit("setState", { name: "loggedIn", val: false });
        this.$store.commit("setState", { name: "user", val: "" });
        this.$store.commit("setState", {
          name: "userRank",
          val: "",
        });
      }
      this.loginUsername = "";
      this.loginPasswd = "";
      this.signupLogin = "";
      this.signupPasswd = "";
      this.signupConfirmPasswd = "";
      this.loginDialog = false;
    });
  },
  computed: {
    rank: function() {
      switch (this.$store.state.userRank) {
        case "user":
          return "Użytkownik";
        case "admin":
          return "Administrator";
      }
      return "";
    },
  },
};
</script>

<style lang="scss">
.login {
  margin: 20px;
  margin-top: 0px;
  .v-avatar {
    transform: scale(150%);
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    font-size: 35px;
    padding-top: 15px;
  }
  .loginBtn {
    margin-top: 10px;
  }
  .signupBtn {
    margin-top: 10px;
  }
}

.v-slide-group__prev {
  position: absolute;
}

.loginForm,
.signupForm {
  position: relative;
  margin-top: calc(50vh - 200px);
  width: 300px;
  left: 50%;
  right: 50%;
  transform: translate(-50%);
  .v-text-field {
    max-width: 300px;
  }
  .v-btn {
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
  }
  .decorativeLoginIcon,
  .decorativeSignupIcon {
    margin-left: -20px;
    margin-bottom: 40px;
    margin-top: -40px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    transform: scale(200%);
  }
}
.loginCard,
.signupCard {
  padding: 20px;
}
.account {
  text-align: center;
  p {
    font-size: 20px;
    padding-top: 13px;
  }
  .v-chip {
    margin-top: 10px;
  }
  .v-btn {
    margin-top: 20px;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  }
}

.adminBtn {
  margin-top: 10px;
  left: 50%;
  right: 50%;
  transform: translateX(-50%);
}
</style>
