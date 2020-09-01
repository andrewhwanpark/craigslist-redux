const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Socket.io
const http = require("http").createServer(app);
// eslint-disable-next-line no-unused-vars
const io = require("socket.io")(http);

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// http.listen(3000, () => {
//   console.log("listening on *:3000");
// });

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

app.use("/listings", listingsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
