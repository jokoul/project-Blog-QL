const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const firebase = require("firebase-admin");

let firebaseConfig = functions.config().firebase;
firebase.initializeApp(firebaseConfig);

const graphql = require("./graphql");
exports.graphql = functions.https.onRequest(graphql);
