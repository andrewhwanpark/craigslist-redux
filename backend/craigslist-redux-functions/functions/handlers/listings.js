const { db } = require("../util/admin");

exports.getAllListings = (request, response) => {
  db.collection("listings")
    .orderBy("date", "desc")
    .get()
    .then((data) => {
      let listings = [];
      data.forEach((doc) => {
        listings.push({
          listingId: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          date: doc.data().date,
          thumbnail: doc.data().thumbnail,
          image: doc.data().image,
          desc: doc.data().desc,
          id: doc.data().id,
        });
      });
      return response.json(listings);
    })
    .catch((err) => console.error(err));
};

exports.postOneListing = (request, response) => {
  const newListing = {
    title: request.body.title,
    price: request.body.price,
    date: new Date().toISOString(),
    thumbnail: request.body.thumbnail,
    image: request.body.image,
    desc: request.body.desc,
    id: request.body.id,
  };

  db.collection("listings")
    .add(newListing)
    .then((doc) => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};
