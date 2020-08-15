const firestoreService = require("firestore-export-import");
var serviceAccount = require("../../.firebase/ii-p-da679-firebase-adminsdk-xbcue-60c8c5ddaf.json");

var fileName = process.argv[2];

firestoreService.initializeApp(
  serviceAccount,
  "https://ii-p-da679.firebaseio.com"
);

firestoreService.restore(fileName, ***REMOVED***
  dates: ["timestamp"],
***REMOVED***);
