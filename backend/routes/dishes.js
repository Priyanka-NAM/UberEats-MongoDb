const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");
var kafka = require("../kafka/client");

const app = require("../app");

const { secret } = require("../Utils/config");
const { RestaurantDetails, Dishes } = require("../Models/Models");
const { checkAuth } = require("../Utils/passport");

// const addDishesIds = (dishes) => {
//   const modifiedDishes = dishes.map((dish) => {
//     let modifiedDishData = JSON.parse(JSON.stringify(dish));
//     modifiedDishData.dish_id = dish._id;
//     return modifiedDishData;
//   });
//   return modifiedDishes;
// };

// app.post("/ubereats/dishes/adddish", checkAuth, (req, res) => {
//   console.log("add dish request", req);
//   const newDish = new Dishes({
//     restaurant_id: req.body.restaurentId,
//     name: req.body.dishname,
//     description: req.body.dishdescription,
//     image_file_path: req.body.imageFilePath,
//     category: req.body.dishcategory,
//     dish_type: req.body.dishtype,
//     ingredients: req.body.ingredients,
//     price: req.body.price,
//     isActive: "true",
//   });

//   Dishes.findOne(
//     {
//       restaurant_id: req.body.restaurentId,
//       name: req.body.dishname,
//       isActive: "true",
//     },
//     (error, result) => {
//       if (error) {
//         res.status(400).send({ status: "Internal server error" });
//         return;
//       }
//       if (result) {
//         res.status(400).send({ status: "DISH_EXISTS" });
//       } else {
//         newDish.save((err, data) => {
//           if (err) {
//             res.status(400).send({ status: "DISH_COULDNOT_BE_ADDED" });
//           } else {
//             Dishes.find(
//               { restaurant_id: req.body.restaurentId, isActive: "true" },
//               (finderr, dishes) => {
//                 if (finderr) {
//                   res.status(400).send({ status: "RESTAURANT_ID_NULL" });
//                   return;
//                 }
//                 res.send({
//                   status: "DISH_ADDED",
//                   allDishes: addDishesIds(dishes),
//                 });
//               }
//             );
//           }
//         });
//       }
//     }
//   );
// });

app.post("/ubereats/dishes/adddish", checkAuth, async function (req, res) {
  kafka.make_request("dishesAddDish", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
      return;
    } else {
      if (results.errCode) {
        const errCode = results.errCode;
        if (errCode === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else if (errCode === 400) {
          res.status(400).send(results.data);
        }
        return;
      } else {
        res.send(results.data);
        return;
      }
    }
  });
});

// app.post("/ubereats/dishes/updatedish", checkAuth, (req, res) => {
//   const DishUpdate = {
//     $set: {
//       restaurant_id: req.body.restaurentId,
//       name: req.body.dishname,
//       description: req.body.dishdescription,
//       image_file_path: req.body.imageFilePath,
//       category: req.body.dishcategory,
//       dish_type: req.body.dishtype,
//       price: req.body.price,
//       ingredients: req.body.ingredients,
//       isActive: req.body.isActive,
//     },
//   };
//   Dishes.updateOne(
//     { _id: req.body.dishId, restaurant_id: req.body.restaurentId },
//     DishUpdate,
//     (error, result) => {
//       if (error) {
//         console.log("Error in dish Update ", error);
//         res.status(400).send({ status: "NO_DISH_ID" });
//         return;
//       }
//       Dishes.findOne({ _id: req.body.dishId }, (err, dishdata) => {
//         if (err) {
//           console.log("Error in dish Update ", error);
//           res.status(400).send({ status: "CANNOT_GET_UPDATED_DISH_DETAILS" });
//           return;
//         }
//         Dishes.find(
//           { restaurant_id: req.body.restaurentId, isActive: "true" },
//           (finderr, dishes) => {
//             if (finderr) {
//               res.status(400).send({ status: "RESTAURANT_ID_NULL" });
//               return;
//             }
//             res.send({
//               status: "DISH_UPDATED",
//               allDishes: addDishesIds(dishes),
//             });
//           }
//         );
//       });
//     }
//   );
// });

app.post("/ubereats/dishes/updatedish", checkAuth, async function (req, res) {
  kafka.make_request("dishesUpdateDish", req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
      return;
    } else {
      if (results.errCode) {
        const errCode = results.errCode;
        if (errCode === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else if (errCode === 400) {
          res.status(400).send(results.data);
        }
        return;
      } else {
        res.send(results.data);
        return;
      }
    }
  });
});

// app.get("/ubereats/dishes/alldishes/:restaurant_id", checkAuth, (req, res) => {
//   Dishes.find(
//     { restaurant_id: req.params.restaurant_id, isActive: "true" },
//     (err, dishes) => {
//       if (err) {
//         res
//           .status(400)
//           .send({ status: "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND" });
//         return;
//       }

//       const modifiedDishes = dishes.map((dish) => {
//         let modifiedDish = JSON.parse(JSON.stringify(dish));
//         modifiedDish.dish_id = dish._id;
//         return modifiedDish;
//       });
//       res.send({
//         status: "ALL_DISHES",
//         allDishes: modifiedDishes,
//       });
//     }
//   );
// });

app.get(
  "/ubereats/dishes/alldishes/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getAllDishes", req.params, function (err, results) {
      console.log("getAllDishes response from Kafka Backend ", results);
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
        return;
      } else {
        if (results.errCode) {
          const errCode = results.errCode;
          if (errCode === 500) {
            res.writeHead(500, {
              "Content-Type": "text/plain",
            });
            res.end();
          } else if (errCode === 400) {
            res.status(400).send(results.data);
          }
          return;
        } else {
          res.send(results.data);
          return;
        }
      }
    });
  }
);
