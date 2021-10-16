/* eslint-disable camelcase */
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const db = require("../Utils/connection");

const saltrounds = 10;
const router = express.Router();

router.post("/customer", async (req, res) => {
  const {
    name,
    email,
    password,
    country,
    state,
    city,
    address_line_1,
    zipcode,
  } = req.body;
  const hashedPassword = md5(password);
  const sql = `CALL customer_put("${name}","${email}", "${hashedPassword}", null, "${address_line_1}", "${city}", "${state}", "${country}", "${zipcode}", null, null, null);`;
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (result && result.length > 0) {
        if (result[0][0].status === "USER_ADDED") {
          const token = jwt.sign({ _id: result[0][0] }, "jwtPrivateKey");
          jwt.verify(token, "jwtPrivateKey");
          res.header("x-auth-token", token).send({
            status: "USER_ADDED",
            user: result[0][0],
            token,
          });
        } else if (result[0][0].status === "USER_EXISTS") {
          res.status(400).send({ status: "USER_EXISTS" });
        }
      }
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.post("/owner", async (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    password,
    restaurant_address_line_one,
    restaurant_city,
    restaurant_state,
    restaurant_country,
    restaurant_zipcode,
  } = req.body;
  const hashedPassword = md5(password);
  const sql = `CALL restaurant_put(-1, "${name}","${email}", "${hashedPassword}", "", "${restaurant_address_line_one}", "${restaurant_city}", "${restaurant_state}", "${restaurant_country}", "${restaurant_zipcode}", "", "", "", "", "", "", "");`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (result && result.length > 0) {
        if (result[0][0].status === "RESTAURANT_ADDED") {
          const token = jwt.sign({ _id: result[0][0] }, "jwtPrivateKey");
          jwt.verify(token, "jwtPrivateKey");
          res.header("x-auth-token", token).send({
            status: "RESTAURANT_ADDED",
            user: result[0][0],
            token,
          });
        } else if (result[0][0].status === "RESTAURANT_ALREADY_EXISTS") {
          res.status(400).send({ status: "RESTAURANT_ALREADY_EXISTS" });
        }
      }
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

module.exports = router;
