const functions = require('firebase-functions');

module.exports = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Some hello from Firebase!");
});
