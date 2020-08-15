<template>
  <div v-if="authenticated" class="adminPanel">
    <h2 class="header">Panel administracyjny</h2>
    <feedback-section />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FeedbackSection from "../components/adminPanel/FeedbackSection.vue";

export default ***REMOVED***
  name: "AdminPanel",
  components: ***REMOVED*** FeedbackSection ***REMOVED***,
  data() ***REMOVED***
    return ***REMOVED***
      authenticated: false,
    ***REMOVED***;
  ***REMOVED***,
  beforeCreate() ***REMOVED***
    let altThis = this;
    firebase.auth().onAuthStateChanged(function(user) ***REMOVED***
      if (user) ***REMOVED***
        firebase
          .firestore()
          .collection("users")
          .where(
            "username",
            "==",
            user.email.substring(user.email.length - 9, 0)
          )
          .onSnapshot(
            (querySnapshot) => ***REMOVED***
              querySnapshot.forEach(function(doc) ***REMOVED***
                if (doc.data().rank == "admin") ***REMOVED***
                  altThis.authenticated = true;
                ***REMOVED*** else ***REMOVED***
                  altThis.$router.push("/");
                ***REMOVED***
              ***REMOVED***);
            ***REMOVED***,
            (err) => ***REMOVED***
              console.log(`Encountered error: $***REMOVED***err***REMOVED***`);
            ***REMOVED***
          );
      ***REMOVED*** else ***REMOVED***
        altThis.$router.push("/");
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
***REMOVED***;
</script>

<style lang="scss">
.adminPanel ***REMOVED***
  margin: 10px;
***REMOVED***

.header ***REMOVED***
  margin: 20px;
***REMOVED***
</style>
