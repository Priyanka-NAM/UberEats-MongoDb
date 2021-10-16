const express = require("express");

const db = require("../Utils/connection");

const router = express.Router();

router.post("/updatedish", (req, res) => {
  console.log("Request of Dish Update ", req);
  console.log("Request Body of Dish Update ", req.body);
  const {
    dishId,
    restaurentId,
    dishname,
    dishdescription,
    imageFilePath,
    dishcategory,
    dishtype,
    ingredients,
    price,
    isActive,
  } = req.body;
  const sql = `CALL dishes_update("${dishname}",${dishId},"${dishdescription}","${ingredients}","${price}","${imageFilePath}","${dishcategory}",null,"${dishtype}",${restaurentId},null,null,${isActive});`;
  console.log(sql);
  db.query(sql, (err, result, fields) => {
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
        result[0][0].status === "DISH_UPDATE_FAILURE"
      ) {
        res.status(400).send({ status: "DISH_UPDATE_FAILURE" });
        return;
      }
      res.send({
        status: "DISH_UPDATED",
        allDishes: result[0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.post("/adddish", (req, res) => {
  console.log("Request of Add Update ", req);
  console.log("Request Body of Add Update ", req.body);
  const {
    restaurentId,
    dishname,
    dishdescription,
    imageFilePath,
    dishcategory,
    dishtype,
    ingredients,
    price,
  } = req.body;
  const sql = `CALL dishes_put("${dishname}","${dishdescription}","${ingredients}","${price}","${imageFilePath}","${dishcategory}","","${dishtype}",${restaurentId},"","","1");`;
  console.log(sql);
  db.query(sql, (err, result, fields) => {
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

      if (result[0].length > 0 && result[0][0].status === "DISH_EXISTS") {
        res.status(400).send({ status: "DISH_EXISTS" });
        return;
      }
      res.send({
        status: "DISH_ADDED",
        allDishes: result[0],
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.get("/alldishes/:restaurant_id", (req, res) => {
  const sql = `CALL dishes_get_restaurant(${req.params.restaurant_id});`;
  console.log(sql);

  db.query(sql, (error, result) => {
    try {
      if (error) {
        throw error;
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
        result[0][0].status === "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND"
      ) {
        res.status(400).send({
          status: "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND",
        });
        return;
      }

      res.send({
        status: "ALL_DISHES",
        allDishes: result[0],
      });
    } catch (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(err));
    }
  });
});

module.exports = router;
