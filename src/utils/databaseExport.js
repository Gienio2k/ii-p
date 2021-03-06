const firestoreService = require("firestore-export-import");
const fs = require("fs");
const serviceAccount = require(process.argv[2]);

var fileName = process.argv[3];

firestoreService.initializeApp(
  serviceAccount,
  "https://ii-p-da679.firebaseio.com"
);

firestoreService.backups().then((data) => {
  fs.writeFile(
    fileName + Date.now().toString() + ".json",
    JSON.stringify(data),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
});
