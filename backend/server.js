const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
var path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

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

app.use("/listings", listingsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
