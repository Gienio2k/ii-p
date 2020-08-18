<template>
  <div v-if="authenticated" class="adminPanel">
    <h2 class="header">Panel administracyjny</h2>
    <feedback-section />
    <br />
    <blog-section />
    <br />
    <br />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FeedbackSection from "../components/adminPanel/FeedbackSection.vue";
import BlogSection from "../components/adminPanel/BlogSection";
export default {
  name: "AdminPanel",
  components: { FeedbackSection, BlogSection },
  data() {
    return {
      authenticated: false,
    };
  },
  beforeCreate() {
    let altThis = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .where(
            "username",
            "==",
            user.email.substring(user.email.length - 9, 0)
          )
          .onSnapshot(
            (querySnapshot) => {
              querySnapshot.forEach(function (doc) {
                if (doc.data().rank == "admin") {
                  altThis.authenticated = true;
                } else {
                  altThis.$router.push("/");
                }
              });
            },
            (err) => {
              console.log(`Encountered error: ${err}`);
            }
          );
      } else {
        altThis.$router.push("/");
      }
    });
  },
};
</script>

<style lang="scss">
.adminPanel {
  margin: 10px;
}

.header {
  margin: 20px;
}
</style>
