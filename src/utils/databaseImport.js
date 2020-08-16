const firestoreService = require("firestore-export-import");
var serviceAccount = require(process.argv[2]);

var fileName = process.argv[3];

firestoreService.initializeApp(
  serviceAccount,
  "https://ii-p-da679.firebaseio.com"
);

firestoreService.restore(fileName, {
  dates: ["timestamp"],
});
