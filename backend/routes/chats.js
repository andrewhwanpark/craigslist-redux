const router = require("express").Router();
const auth = require("../middleware/auth");
const Chat = require("../models/chat.model");
const Listing = require("../models/listing.model");

// Get buy messages
// Get all messages with sender & receiver as user, but the listing should not be owned by the user
router.get("/buy_messages", auth, (req, res) => {
  const user = req.user;
  // Store listings user owns
  const userListings = [];

  Listing.find({ writer: user })
    .then((doc) => {
      doc.forEach((listing) => {
        userListings.push(listing._id);
      });
    })
    .catch((err) => console.error(err));

  Chat.find({
    $and: [
      { listing: { $nin: userListings } },
      { $or: [{ writer: user }, { receiver: user }] },
    ],
  })
    .populate("writer")
    .populate("receiver")
    .sort("+date")
    .exec((err, chatRes) => {
      if (err) return res.status(400).send(err);

      return res.status(200).send(chatRes);
    });
});

// Get sell messages (receiver is user)
router.get("/sell_messages", auth, (req, res) => {
  const user = req.user;

  Chat.find({ receiver: user })
    .populate("writer", "receiver")
    .populate("listing")
    .sort("-date")
    .exec((err, chatRes) => {
      if (err) return res.status(400).send(err);

      return res.status(200).send(chatRes);
    });
});

module.exports = router;
