const express = require("express");
const jwt = require("jsonwebtoken");

const md5 = require("md5");

const db = require("../Utils/connection");
const { secret } = require("../Utils/config");
const app = require("../app");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

app.post("/ubereats/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = md5(password);
  RestaurantDetails.findOne(
    { email_id: email, password: hashedPassword },
    (error, result) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.end();
      }
      if (result) {
        let modifiedData = JSON.parse(JSON.stringify(result));
        modifiedData.restaurant_id = result._id;
        const token = jwt.sign({ _id: result }, secret);
        res.header("x-auth-token", token).send({
          status: "Authentication Successful",
          user: modifiedData,
          token,
        });
        return;
      } else {
        CustomerDetails.findOne(
          { email_id: email, password: hashedPassword },
          (error, result) => {
            if (error) {
              res.writeHead(500, {
                "Content-Type": "text/plain",
              });
              res.end();
            }
            if (result) {
              let modifiedCustomerData = JSON.parse(JSON.stringify(result));
              modifiedCustomerData.customer_id = result._id;
              const token = jwt.sign({ _id: result }, secret);
              res.header("x-auth-token", token).send({
                status: "Authentication Successful",
                user: modifiedCustomerData,
                token,
              });
              return;
            } else {
              res.status(400).send({ status: "Authentication Failed" });
              return;
            }
          }
        );
      }
    }
  );
});
