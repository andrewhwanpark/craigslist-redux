const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(express.json());

const dir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(dir));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const listingsRouter = require("./routes/listings");
const usersRouter = require("./routes/users");
const chatsRouter = require("./routes/chats");

app.use("/listings", listingsRouter);
app.use("/users", usersRouter);
app.use("/chats", chatsRouter);

// Socket.io
const Chat = require("./models/chat.model");

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on(
    "Chat Sent",
    ({ chatMessage, senderId, receiverId, listingId, date }, callback) => {
      const chat = new Chat({
        message: chatMessage,
        writer: senderId,
        receiver: receiverId,
        listing: listingId,
        date,
      });

      chat
        .save()
        .then((res) => {
          Chat.findById(res._id)
            .populate("writer")
            .populate("receiver")
            .populate("listing")
            .exec((chatErr, chatDoc) => {
              if (chatErr) return callback(chatErr);

              return io.emit("Output Chat Sent", chatDoc);
            });
        })
        .catch((err) => {
          callback(err);
        });
    }
  );

  socket.on(
    "Offer Sent",
    (
      { chatMessage, offerPrice, senderId, receiverId, listingId, date },
      callback
    ) => {
      const chat = new Chat({
        message: chatMessage,
        writer: senderId,
        receiver: receiverId,
        offerPrice,
        listing: listingId,
        date,
      });

      chat
        .save()
        .then((res) => {
          Chat.findById(res._id)
            .populate("writer")
            .populate("receiver")
            .populate("listing")
            .exec((chatErr, chatDoc) => {
              if (chatErr) return callback(chatErr);

              return io.emit("Output Offer Sent", chatDoc);
            });
        })
        .catch((err) => {
          callback(err);
        });
    }
  );

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
