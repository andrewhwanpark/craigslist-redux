const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();

app.get("/listings", (request, response) => {
  admin
    .firestore()
    .collection("listings")
    .get()
    .then((data) => {
      let listings = [];
      data.forEach((doc) => {
        listings.push(doc.data());
      });
      return response.json(listings);
    })
    .catch((err) => console.error(err));
});

app.post("/listing", (request, response) => {
  const newListing = {
    title: request.body.title,
    price: request.body.price,
    date: admin.firestore.Timestamp.fromDate(new Date()),
    thumbnail: request.body.thumbnail,
    image: request.body.image,
    desc: request.body.desc,
    id: request.body.id,
  };

  admin
    .firestore()
    .collection("listings")
    .add(newListing)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
});

exports.api = functions.https.onRequest(app);
