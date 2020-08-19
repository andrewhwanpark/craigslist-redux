const router = require("express").Router();
const auth = require("../middleware/auth");
let Listing = require("../models/listing.model");
const multer = require("multer");

const isNullable = (x) => {
  return x == null;
};

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

router.post("/", (req, res) => {
  const skip = parseInt(req.body.skip);
  const limit = parseInt(req.body.limit);

  // Typecheck since 0 is falsey
  const location = isNullable(req.body.location)
    ? undefined
    : parseInt(req.body.location);

  let findArgs = {};
  if (location !== undefined) {
    findArgs = { location: location };
  }

  Listing.find(findArgs)
    .populate("writer")
    .sort("-date")
    .skip(skip)
    .limit(limit)
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/listings_by_id", (req, res) => {
  const type = req.query.type;
  const cuid = req.query.id;

  if (type === "array") {
  }

  Listing.find({ cuid: { $in: cuid } })
    .populate("writer")
    .exec((err, listing) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(listing);
    });
});

router.post("/add/images", upload.array("images", 6), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const uploads = [];

  for (let i = 0; i < req.files.length; i++) {
    uploads.push({
      fileName: req.files[i].filename,
      filePath: `uploads/${req.files[i].filename}`,
    });
  }

  // Find listing and update
  Listing.findByIdAndUpdate(req.header("listing-id"), {
    image: uploads,
  })
    .then(() => {
      res.json("Images uploaded");
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/add", auth, (req, res) => {
  const writer = req.body.writer;
  const title = req.body.title;
  const price = req.body.price;
  const date = Date.parse(req.body.date);
  const condition = req.body.condition;
  const desc = req.body.desc;
  const location = req.body.location;
  const cuid = req.body.cuid;

  const newListing = new Listing({
    writer,
    title,
    price,
    date,
    condition,
    desc,
    location,
    cuid,
  });

  newListing
    .save()
    .then((doc) => res.json({ id: doc._id }))
    .catch((err) => res.status(400).json(err));
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
