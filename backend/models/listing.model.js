const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    thumbnail: { type: String, required: false },
    image: [{ type: String, required: false }],
    desc: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
