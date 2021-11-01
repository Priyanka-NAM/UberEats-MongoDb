const express = require("express");
const path = require("path");

const app = require("./app");
const db = require("./dbPoolConnection");
const signin = require("./routes/signIn");
const signup = require("./routes/signUp");
const customerrestaurant = require("./routes/customerrestaurant");
const profile = require("./routes/profile");
// const verifyToken = require("./routes/tokenVerification");
const upload = require("./routes/fileUpload");
const orders = require("./routes/orders");
const dishes = require("./routes/dishes");
const owner = require("./routes/owner");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public", "/uploads"))
);

module.exports = app;
