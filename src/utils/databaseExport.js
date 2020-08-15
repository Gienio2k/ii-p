const firestoreService = require("firestore-export-import");
const fs = require("fs");
const serviceAccount = require("../../.firebase/ii-p-da679-firebase-adminsdk-xbcue-60c8c5ddaf.json");

var fileName = process.argv[2];

firestoreService.initializeApp(
  serviceAccount,
  "https://ii-p-da679.firebaseio.com"
);

firestoreService.backups().then((data) => ***REMOVED***
  fs.writeFile(
    fileName + Date.now().toString() + ".json",
    JSON.stringify(data),
    function(err) ***REMOVED***
      if (err) ***REMOVED***
        return console.log(err);
      ***REMOVED***
      console.log("The file was saved!");
    ***REMOVED***
  );
***REMOVED***);
