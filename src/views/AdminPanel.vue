<template>
  <div v-if="authenticated" class="adminPanel">
    <h2 class="header">Panel administracyjny</h2>
    <feedback-section />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
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
    firebase.auth().onAuthStateChanged(function (user) ***REMOVED***
      if (user) ***REMOVED***
        firebase
          .database()
          .ref(
            "/users/" + user.email.substring(user.email.length - 9, 0) + "/rank"
          )
          .on("value", function (snapshot) ***REMOVED***
            if (snapshot.val() == "admin") ***REMOVED***
              altThis.authenticated = true;
            ***REMOVED*** else ***REMOVED***
              altThis.$router.push("/");
            ***REMOVED***
          ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        altThis.$router.push("/");
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
***REMOVED***;
</script>

<style lang='scss'>
.adminPanel ***REMOVED***
  margin: 10px;
***REMOVED***

.header ***REMOVED***
  margin: 20px;
***REMOVED***
</style>
