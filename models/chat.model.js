const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: { type: String, required: true },
  offerPrice: { type: Number, required: false },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  date: { type: Date, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
