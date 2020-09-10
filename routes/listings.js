/* eslint-disable node/prefer-promises/fs */
/* eslint-disable consistent-return */
const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const auth = require("../middleware/auth");
const Listing = require("../models/listing.model");
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
  // eslint-disable-next-line consistent-return
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

router.post("/", (req, res) => {
  const skip = parseInt(req.body.skip, 10);
  const limit = parseInt(req.body.limit, 10);

  // Typecheck since 0 is falsey
  const location = isNullable(req.body.location)
    ? undefined
    : parseInt(req.body.location, 10);

  let findArgs = {};
  if (location !== undefined) {
    findArgs = { location };
  }

  if (req.body.categories.length !== 0) {
    findArgs.category = { $in: req.body.categories };
  }

  Listing.find(findArgs)
    .populate("writer")
    .sort("-date")
    .skip(skip)
    .limit(limit)
    .then((listings) => res.json(listings))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.get("/listings-by-user", (req, res) => {
  const _id = req.query.id;

  Listing.find({ writer: { $in: _id } })
    .populate("writer")
    .sort("-date")
    .exec((err, listing) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(listing);
    });
});

router.get("/listings-by-id", (req, res) => {
  const type = req.query.type;
  let id;

  if (type === "array") {
    id = req.query.id.split(",");
  } else {
    id = req.query.id;
  }

  Listing.find({ _id: { $in: id } })
    .populate("writer")
    .sort("-date")
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

  for (let i = 0; i < req.files.length; i += 1) {
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
      return res.json("Images uploaded");
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });

  return undefined;
});

router.post("/add", auth, (req, res) => {
  const writer = req.body.writer;
  const title = req.body.title;
  const price = req.body.price;
  const date = Date.parse(req.body.date);
  const condition = req.body.condition;
  const category = req.body.category;
  const desc = req.body.desc;
  const location = req.body.location;

  // Increment forSale of user
  User.findByIdAndUpdate(req.user, { $inc: { forSale: 1 } }).catch((err) => {
    return res.status(500).json({ error: err.message });
  });

  const newListing = new Listing({
    writer,
    title,
    price,
    date,
    condition,
    category,
    desc,
    location,
  });

  newListing
    .save()
    .then((doc) => res.json({ id: doc._id }))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Listing.findById(req.params.id)
    .then((listing) => res.json(listing))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.delete("/:id", (req, res) => {
  // Find images associated
  Listing.findById(req.params.id)
    .then((listingRes) => {
      const images = listingRes.image;

      Listing.findByIdAndDelete(req.params.id)
        .then(() => {
          images.forEach(async (img) => {
            try {
              await fs.unlink(`${__dirname}/../${img.filePath}`);
            } catch (err) {
              console.error(err);
            }
          });

          res.json("Listing deleted.");
        })
        .catch((err) => res.status(500).json(`Error: ${err}`));
    })
    .catch((err) => res.status(500).json(`Error: ${err}`));
});

router.post("/update-images", upload.array("images", 6), (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const id = req.query.id;
  const order = req.query.order.split(",").map((o) => parseInt(o, 10));
  const filenames = req.query.filenames.split(",");

  // New files uploaded from client
  const uploads = [];

  for (let i = 0; i < req.files.length; i += 1) {
    uploads.push({
      fileName: req.files[i].filename,
      filePath: `uploads/${req.files[i].filename}`,
    });
  }

  Listing.findById(id)
    .then((listing) => {
      const shouldDel = [];

      listing.image.forEach((img) => {
        const found = filenames.find((fname) => fname === img.fileName);

        if (isNullable(found)) shouldDel.push(img);
      });

      shouldDel.forEach(async (file) => {
        try {
          await fs.unlink(`${__dirname}/../${file.filePath}`);
        } catch (err) {
          console.error(err);
        }
      });

      const images = [];

      order.forEach((o) => {
        if (o === 1) {
          // New image
          images.push(uploads.pop());
        } else {
          // Old image
          const file = filenames.pop();
          images.push({
            fileName: file,
            filePath: `uploads/${file}`,
          });
        }
      });

      listing.image = images;

      listing
        .save()
        .then(() => res.json("Listing updated!"))
        .catch((err) => res.status(500).json(`Error: ${err}`));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(`Error: ${err}`);
    });
});

router.post("/update/:id", auth, (req, res) => {
  Listing.findById(req.params.id)
    .then((listing) => {
      listing.title = req.body.title;
      listing.price = req.body.price;
      listing.location = req.body.location;
      listing.category = req.body.category;
      listing.desc = req.body.desc;
      listing.condition = req.body.condition;

      if (
        isDefined(req.body.files) &&
        listing.image.length !== req.body.files.length
      ) {
        // User deleted pre-existing photos
        // We must find the photos that the user deleted, then delete from uploads folder
        const shouldDel = [];

        listing.image.forEach((img) => {
          const found = req.body.files.find(
            (file) => file.fileName === img.fileName
          );
          if (isNullable(found)) shouldDel.push(img);
        });

        // Delete files in shouldDel
        shouldDel.forEach(async (file) => {
          try {
            await fs.unlink(`${__dirname}/../${file.filePath}`);
          } catch (err) {
            console.error(err);
          }
        });
      }

      // Assign new images
      listing.image = isDefined(req.body.files)
        ? req.body.files
        : listing.image;

      listing
        .save()
        .then(() => res.json("Listing updated!"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => {
      return res.status(400).json(`Error: ${err}`);
    });
});

module.exports = router;
