"use strict";

const app = require("../app");
const multer = require("multer");
const { checkAuth } = require("../Utils/passport");
var kafka = require("../kafka/client");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "diwxaieww",
  api_key: 839265298459475,
  api_secret: "PfFqf8H1zMkSK7y3lRomNvOP28w",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});
const upload = multer({
  storage: storage,
}).single("image");

// app.post(
//   "/ubereats/fileUpload/owner/profile",
//   checkAuth,
//   async (req, res, next) => {
//     upload(req, res, (err) => {
//       if (!err) {
//         res.end(req.file.path);
//       } else {
//         console.log("Error!");
//       }
//     });
//   }
// );

app.post(
  "/ubereats/fileUpload/profile_upload",
  checkAuth,
  async (req, res, next) => {
    upload(req, res, (err) => {
      if (!err) {
        if (req.file && req.file.path) {
          res.end(req.file.path);
        }
      } else {
        console.log("Error!");
      }
    });
  }
);
