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
//@ts-ignore
exports.checkRecaptcha = onRequest(function (req, res) {
    var allowedOrigins = ["http://127.0.0.1:5500", "https://williamowen65.github.io"];
    var origin = req.headers.origin;
    // Check if the request's origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
        res.set("Access-Control-Allow-Origin", origin);
    }
    // Handle preflight requests (OPTIONS method)
    if (req.method === "OPTIONS") {
        // Set preflight response headers
        res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type");
        res.set("Access-Control-Max-Age", "3600");
        return res.status(204).send(""); // Respond with no content
    }
    var response = req.body.response;
    console.log("recaptcha response", { response: response });
    // res.send('hi')
    fetch("https://recaptcha.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            /// I think this need to have a new arg.... 3rd arg... research!
            secret: "6Le7AG0qAAAAAKHJD25jUAIc5PSw2lBAqlWFk4JI",
            response: response
        })
    })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        // res.send("Data fetched")
        res.json(data);
        if (data.success) {
            console.log("Verification successful:", data);
            // Handle successful verification
        }
        else {
            console.error("Verification failed:", data);
            // Handle failed verification
        }
    })
        .catch(function (error) {
        res.send("Data error");
        console.error("Error during fetch:", error);
    });
});
