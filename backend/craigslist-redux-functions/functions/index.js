const functions = require("firebase-functions");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

const { getAllListings, postOneListing } = require("./handlers/listings");
const { signup, login } = require("./handlers/users");

// Listing routes
app.get("/listings", getAllListings);
app.post("/listing", FBAuth, postOneListing);

// Users routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
