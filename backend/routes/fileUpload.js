"use strict";

const app = require("../app");
const multer = require("multer");
const { checkAuth } = require("../Utils/passport");

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

app.post(
  "/ubereats/fileUpload/owner/profile",
  checkAuth,
  async (req, res, next) => {
    upload(req, res, (err) => {
      if (!err) {
        res.end(res.json({ image: req.file }));
      } else {
        console.log("Error!");
      }
    });
  }
);

app.post(
  "/ubereats/fileUpload/profile_upload",
  checkAuth,
  async (req, res, next) => {
    upload(req, res, (err) => {
      if (!err) {
        res.end(res.json({ image: req.file }));
      } else {
        console.log("Error!");
      }
    });
  }
);

// app.post(
//   "/ubereats/fileUpload/owner/profile",
//   upload.single("image"),
//   async (req, res, err) => {
//     if (!err) {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(res.json({ image: req.file }));
//       // return res.json({ image: req.file });
//     } else {
//       console.log("Error!");
//     }
//   }
// );

// const router = express.Router();
// console.log(
//   "Dest file path: ",
//   path.join(path.join(__dirname, ".."), "public")
//   // path.join(path.join(__dirname, ".."), "public", "uploads")
// );

// const userstorage = multer.diskStorage({
//   destination: path.join(path.join(__dirname, ".."), "public"),
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `user${req.params.user_id}-${Date.now()}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// app.use("/public", express.static(path.join(__dirname, "/public")));
// app.use(
//   "/public/uploads",
//   express.static(path.join(__dirname, "/public", "/uploads"))
// );

// const userstorage = multer.diskStorage({
//   destination: path.join(path.join(__dirname, ".."), "public"),
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `user${req.params.user_id}-${Date.now()}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// const upload = multer({
//   storage: userstorage,
//   limits: { fileSize: 100000000 },
// }).single("image");

// cloudinary.config({
//   cloud_name: "diwxaieww",
//   api_key: "839265298459475",
//   api_secret: "PfFqf8H1zMkSK7y3lRomNvOP28w",
// });

// async function uploadToCloudinary(locaFilePath) {
//   // locaFilePath: path of image which was just
//   // uploaded to "uploads" folder

//   var mainFolderName = "main";
//   // filePathOnCloudinary: path of image we want
//   // to set when it is uploaded to cloudinary
//   var filePathOnCloudinary = mainFolderName + "/" + locaFilePath;

//   return cloudinary.uploader
//     .upload(locaFilePath, { public_id: filePathOnCloudinary })
//     .then((result) => {
//       // Image has been successfully uploaded on
//       // cloudinary So we dont need local image
//       // file anymore
//       // Remove file from local uploads folder
//       fs.unlinkSync(locaFilePath);

//       return {
//         message: "Success",
//         url: result.url,
//       };
//     })
//     .catch((error) => {
//       // Remove file from local uploads folder
//       fs.unlinkSync(locaFilePath);
//       return { message: "Fail" };
//     });
// }

// router.post("/profile_upload", upload.single("profile-file"), (req, res) => {
//   upload(req, res, (err) => {
//     console.log("request of the ", req.file);
//     if (!err) {
//       var locaFilePath = req.file;
//       // Upload the local image to Cloudinary
//       // and get image url as response
//       var result = await uploadToCloudinary(locaFilePath);

//       // Generate html to display images on web page.
//       var response = buildSuccessMsg([result.url]);

//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(response);
//     } else {
//       console.log("Error!");
//     }
//   });
// });

// router.post("/owner/profile", upload.single("profile-file"), (req, res) => {
// router.post(
//   "/owner/profile",
//   upload.single("profile-file"),
//   upload(req, res, (err) => {
//     console.log("request of the ", req.file);
//     if (!err) {
//       var locaFilePath = req.file;
//       // Upload the local image to Cloudinary
//       // and get image url as response
//       var result = await uploadToCloudinary(locaFilePath);

//       // Generate html to display images on web page.
//       var response = buildSuccessMsg([result.url]);

//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(response);
//     } else {
//       console.log("Error!");
//     }
//   })
// );
// });
