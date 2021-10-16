const express = require("express");
const path = require("path");
const multer = require("multer");

const router = express.Router();
console.log(
  "Dest file path: ",
  path.join(path.join(__dirname, ".."), "public")
  // path.join(path.join(__dirname, ".."), "public", "uploads")
);

const userstorage = multer.diskStorage({
  destination: path.join(path.join(__dirname, ".."), "public"),
  filename: (req, file, cb) => {
    cb(
      null,
      `user${req.params.user_id}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const useruploads = multer({
  storage: userstorage,
  limits: { fileSize: 100000000 },
}).single("image");

router.post("/profile_upload", (req, res) => {
  useruploads(req, res, (err) => {
    console.log("request of the ", req.file);
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(req.file.filename);
    } else {
      console.log("Error!");
    }
  });
});

router.post("/owner/profile", (req, res) => {
  useruploads(req, res, (err) => {
    console.log("request of the ", req.file);
    if (!err) {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(req.file.filename);
    } else {
      console.log("Error!");
    }
  });
});

module.exports = router;
