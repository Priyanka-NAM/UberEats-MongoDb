const express = require("express");
const jwt = require("jsonwebtoken");

const md5 = require("md5");

const db = require("../Utils/connection");
const { auth } = require("../Utils/passport");

auth();

const router = express.Router();

router.post("/", (req, res) => {
  console.log("Request body for authenticate user ", req.body);
  const { password } = req.body;
  const hashedPassword = md5(password);
  const sql = `CALL authenticate_user("${req.body.email}","${hashedPassword}");`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (result && result.length > 0) {
        if (result[0][0].status === "SUCCESS") {
          console.log("result", result);
          const token = jwt.sign({ _id: result[0][0] }, "jwtPrivateKey");
          res.header("x-auth-token", token).send({
            status: "Authentication Successful",
            user: result[0][0],
            token,
          });
          return;
        }
        if (result[0][0].status === "FAILED") {
          res.status(400).send({ status: "Authentication Failed" });
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
