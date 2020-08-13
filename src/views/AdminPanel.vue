<template>
  <div v-if="authenticated" class="admin_panel">
    <h2>Panel administracyjny</h2>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default ***REMOVED***
  name: "AdminPanel",
  data() ***REMOVED***
    return ***REMOVED***
      authenticated: false,
    ***REMOVED***;
  ***REMOVED***,
  beforeCreate() ***REMOVED***
    let alt_this = this;
    firebase.auth().onAuthStateChanged(function(user) ***REMOVED***
      if (user) ***REMOVED***
        firebase
          .database()
          .ref(
            "/users/" + user.email.substring(user.email.length - 9, 0) + "/rank"
          )
          .on("value", function(snapshot) ***REMOVED***
            if (snapshot.val() == "admin") ***REMOVED***
              alt_this.authenticated = true;
            ***REMOVED*** else ***REMOVED***
              alt_this.$router.push("/");
            ***REMOVED***
          ***REMOVED***);
      ***REMOVED*** else ***REMOVED***
        alt_this.$router.push("/");
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***,
***REMOVED***;
</script>

<style></style>
