const express = require("express");
const db = require("../Utils/connection");

const router = express.Router();

router.get("/restaurantsearch/:search_input", (req, res) => {
  const sql = `CALL search_restaurants("${req.params.search_input}");`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (!result || result.length === 0) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.send({
          status: "Result from Db Undefined",
        });
        return;
      }

      if (result[0].length === 0) {
        res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
        return;
      }
      res.send({
        status: "ALL_RESTAURANTS",
        allRestaurants: result[0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.get("/favourite/:customer_id", (req, res) => {
  const sql = `CALL get_favorite_restaurants(${req.params.customer_id});`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (!result || result.length === 0) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.send({
          status: "Result from Db Undefined",
        });
        return;
      }

      if (
        result[0].length > 0 &&
        result[0][0].status === "CUSTOMER_ID_IS_NULL"
      ) {
        res.status(400).send({ status: "CUSTOMER_ID_IS_NULL" });
        return;
      }
      res.send({
        status: "FAV_RESTAURANTS",
        favRestaurants: result[0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.get("/allrestaurants", (req, res) => {
  const sql = `CALL get_all_restaurants();`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (!result || result.length === 0) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.send({
          status: "Result from Db Undefined",
        });
        return;
      }

      if (result[0].length === 0) {
        res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
        return;
      }
      res.send({
        status: "ALL_RESTAURANTS",
        allRestaurants: result[0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.post("/updatefavourite", (req, res) => {
  const sql = `CALL post_favorite_restaurants(${req.body.customerId},${
    req.body.restaurantId
  },"${req.body.newisFav.toString()}");`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (!result || result.length === 0) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.send({
          status: "Result from Db Undefined",
        });
        return;
      }

      if (result[0].length > 0 && result[0][0].status !== "FAVORITES_CREATED") {
        res
          .status(400)
          .send({ status: "FAVORITES_CREATION_FAILED", favId: -1 });
        return;
      }
      res.send({
        status: "FAVORITES_CREATED",
        favId: result[0][0].favId,
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.get("/restaurantdetails/:restaurent_id", (req, res) => {
  const sql = `CALL restaurant_get_id(${req.params.restaurent_id});`;
  console.log(sql);
  db.query(sql, (err, result) => {
    try {
      if (err) {
        throw err;
      }
      if (!result || result.length === 0) {
        res.writeHead(500, {
          "Content-Type": "text/plain",
        });
        res.send({
          status: "Result from Db Undefined",
        });
        return;
      }
      if (result[0].length === 0) {
        res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
        return;
      }
      if (result[0][0].status === "RESTAURANT_ID_IS_NULL") {
        res.status(400).send({ status: "RESTAURANT_ID_IS_NULL" });
        return;
      }
      res.send({
        status: "RESTAURANT_DETAILS",
        restaurentDetails: result[0][0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

module.exports = router;
