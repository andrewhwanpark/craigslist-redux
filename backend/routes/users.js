const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../middleware/auth");
let User = require("../models/user.model");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.toLowerCase().split(" ").join("-"));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post("/uploadImage", auth, upload.single("file"), (req, res) => {
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
      res.json("Profile picture updated");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/changeInfo", auth, (req, res) => {
  const { username, email, location } = req.body;

  User.findByIdAndUpdate(req.user, {
    username: username,
    email: email,
    location: location,
  })
    .then(() => {
      res.json("Information updated");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
    image: user.image,
  });
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordCheck, username } = req.body;
    // Validate
    if (!email || !password || !passwordCheck || !username) {
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

    const existingUser = await User.findOne({ email: email });
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
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
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

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        image: user.image,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false);
    }

    const user = await User.findById(verified.id);
    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
