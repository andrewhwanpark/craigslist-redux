const router = require("express").Router();
const auth = require("../middleware/auth");
const Chat = require("../models/chat.model");

// Get buy messages (sender is user)
router.get("/buy_messages", auth, (req, res) => {
  const user = req.user;

  Chat.find({ writer: user })
    .populate("receiver")
    // .populate("listing")
    .sort("-date")
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
