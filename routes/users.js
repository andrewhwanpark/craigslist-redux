/* eslint-disable consistent-return */
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../middleware/auth");
const User = require("../models/user.model");
const { isNullable, isDefined } = require("../utils/null-check");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads/`);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname.toLowerCase().split(" ").join("-")}`
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/add-to-favorites", auth, (req, res) => {
  const id = req.body.id;

  User.findOne({ _id: req.user, favorites: id })
    .then((findRes) => {
      const exists = isDefined(findRes);

      if (exists === true) {
        User.findByIdAndUpdate(req.user, {
          $pull: { favorites: id },
        })
          .then(() => {
            return res.json({ msg: "Removed from favorites" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      } else {
        User.findByIdAndUpdate(req.user, {
          $push: { favorites: id },
        })
          .then(() => {
            return res.json({ msg: "Added to favorites" });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

router.post("/upload-image", auth, upload.single("file"), (req, res) => {
  // If no files uploaded
  if (req.file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Find User, then update with new pic
  User.findByIdAndUpdate(req.user, {
    image: {
      fileName: req.file.filename,
      filePath: `uploads/${req.file.filename}`,
    },
  })
    .then(() => {
      return res.json("Profile picture updated");
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });

  return undefined;
});

router.post("/change-info", auth, (req, res) => {
  const { username, email, location } = req.body;

  User.findByIdAndUpdate(req.user, {
    username,
    email,
    location,
  })
    .then(() => {
      res.json("Information updated");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/find-by-username", (req, res) => {
  const user = req.query.username;

  User.find({ username: user })
    .then((userRes) => {
      res.json(userRes);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);

  res.json({
    username: user.username,
    id: user._id,
    image: user.image,
    sold: user.sold,
    forSale: user.forSale,
    createdAt: user.createdAt,
    location: user.location,
    favorites: user.favorites,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, username, location } = req.body;
    // Validate
    if (
      isNullable(email) ||
      isNullable(password) ||
      isNullable(passwordCheck) ||
      isNullable(username)
    ) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password needs to be at least 5 characters long" });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter same password twice for verification" });
    }
    if (username.length < 3) {
      return res
        .status(400)
        .json({ msg: "Username needs to be at least 3 characters long" });
    }
    if (isNullable(location)) {
      return res.status(400).json({ msg: "Please select your location" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      username,
      location,
    });

    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        image: user.image,
        location: user.location,
        forSale: user.forSale,
        favorites: user.favorites,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/token-is-valid", (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json(false);

  User.findById(verified.id)
    .then((userRes) => {
      if (isNullable(userRes)) {
        return res.json(false);
      }

      return res.json(true);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
});

module.exports = router;
