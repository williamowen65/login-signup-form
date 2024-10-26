/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var onRequest = require("firebase-functions/v2/https").onRequest;
var logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
//@ts-ignore
exports.helloWorld = onRequest(function (request, response) {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});
