import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";

Vue.config.productionTip = false;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = ***REMOVED***
  apiKey: "AIzaSyCMHpzwUQvKEjFVKHk70ME518blJzj2Zx4",
  authDomain: "ii-p-da679.firebaseapp.com",
  databaseURL: "https://ii-p-da679.firebaseio.com",
  projectId: "ii-p-da679",
  storageBucket: "ii-p-da679.appspot.com",
  messagingSenderId: "351153075255",
  appId: "1:351153075255:web:fe0392328b763d38883bb2",
  measurementId: "G-KKTME900W3",
***REMOVED***;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

new Vue(***REMOVED***
  router,
  store,
  vuetify,
  render: (h) => h(App),
***REMOVED***).$mount("#app");
