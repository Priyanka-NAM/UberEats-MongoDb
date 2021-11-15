/* eslint-disable prefer-template */
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const connection = require("./Utils/connection");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://3.15.190.156:3000",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use((res, req, next) => {
  // res.header("Access-Control-Allow-Origin", "http://3.15.190.156:3000");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Cache-Control", "no-cache");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,PATCH,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(passport.initialize());

module.exports = app;
