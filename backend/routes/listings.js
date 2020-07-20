const router = require("express").Router();
let Listing = require("../models/listing.model");

router.route("/").get((req, res) => {
  Listing.find()
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const date = Date.parse(req.body.date);
  const thumbnail = req.body.thumbnail;
  const image = req.body.image;
  const desc = req.body.desc;

  const newListing = new Listing({
    title,
    price,
    date,
    thumbnail,
    image,
    desc,
  });

  newListing
    .save()
    .then(() => res.json("Listing added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Listing.findById(req.params.id)
    .then((listing) => res.json(listing))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Listing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Listing deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      listing.title = req.body.title;
      listing.price = req.body.price;
      listing.date = Date.parse(req.body.date);
      listing.thumbnail = req.body.thumbnail;
      listing.image = req.body.image;
      listing.desc = req.body.desc;

      listing
        .save()
        .then(() => res.json("Listing updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
