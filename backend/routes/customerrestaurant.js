const jwt = require("jsonwebtoken");
const md5 = require("md5");
var kafka = require("../kafka/client");

const app = require("../app");
const { checkAuth } = require("../Utils/passport");
const { secret } = require("../Utils/config");
const {
  CustomerDetails,
  RestaurantDetails,
  Favorites,
} = require("../Models/Models");

// router.get("/restaurantsearch/:search_input", (req, res) => {
//   const sql = `CALL search_restaurants("${req.params.search_input}");`;
//   console.log(sql);
//   db.query(sql, (err, result) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       if (!result || result.length === 0) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.send({
//           status: "Result from Db Undefined",
//         });
//         return;
//       }

//       if (result[0].length === 0) {
//         res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
//         return;
//       }
//       res.send({
//         status: "ALL_RESTAURANTS",
//         allRestaurants: result[0],
//       });
//     } catch (error) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(error));
//     }
//   });
// });

app.get(
  "/ubereats/customerrestaurant/restaurantsearch/:search_input",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getSearchRestaurants",
      req.params,
      function (err, results) {
        console.log(
          "getSearch Restaurants response from Kafka Backend ",
          results
        );
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
      }
    );
  }
);

// app.get(
//   "/ubereats/customerrestaurant/allrestaurants",
//   checkAuth,
//   (req, res) => {
//     RestaurantDetails.find({}, (err, restaurantsdata) => {
//       if (err) {
//         res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
//         return;
//       }
//       const modifiedRestaurantsData = restaurantsdata.map((restaurant) => {
//         let modifiedRestaurant = JSON.parse(JSON.stringify(restaurant));
//         modifiedRestaurant.restaurant_id = restaurant._id;
//         return modifiedRestaurant;
//       });
//       res.send({
//         status: "ALL_RESTAURANTS",
//         allRestaurants: modifiedRestaurantsData,
//       });
//     });
//   }
// );
app.get(
  "/ubereats/customerrestaurant/allrestaurants",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getAllRestaurants",
      req.params,
      function (err, results) {
        console.log("getAllRestaurants response from Kafka Backend ", results);
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
      }
    );
  }
);

// app.get(
//   "/ubereats/customerrestaurant/restaurantdetails/:restaurant_id",
//   checkAuth,
//   (req, res) => {
//     RestaurantDetails.findOne(
//       { _id: req.params.restaurant_id },
//       (err, restaurantdata) => {
//         if (err || !restaurantdata) {
//           res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
//           return;
//         }
//         let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
//         modifiedData.restaurant_id = restaurantdata._id;
//         res.send({
//           status: "RESTAURANT_DETAILS",
//           restaurentDetails: modifiedData,
//         });
//       }
//     );
//   }
// );

app.get(
  "/ubereats/customerrestaurant/restaurantdetails/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getRestaurantDetails",
      req.params,
      function (err, results) {
        console.log(
          "getRestaurantDetails response from Kafka Backend ",
          results
        );
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
      }
    );
  }
);

// app.get(
//   "/ubereats/customerrestaurant/favourite/:customer_id",
//   checkAuth,
//   (req, res) => {
//     CustomerDetails.find(
//       { _id: req.params.customer_id },
//       (err, restaurantdata) => {
//         if (err) {
//           res.status(400).send({ status: "RESTAURANTS_NOT_FOUND" });
//           return;
//         }
//         res.send({
//           status: "RESTAURANT_DETAILS",
//           restaurentDetails: restaurantdata,
//         });
//       }
//     );
//   }
// );

app.get(
  "/ubereats/customerrestaurant/favourite/:customer_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getFavouriteRestaurants",
      req.params,
      function (err, results) {
        console.log(
          "getFavouriteRestaurants response from Kafka Backend ",
          results
        );
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
      }
    );
  }
);

// router.post("/updatefavourite", (req, res) => {
//   const sql = `CALL post_favorite_restaurants(${req.body.customerId},${
//     req.body.restaurantId
//   },"${req.body.newisFav.toString()}");`;
//   console.log(sql);
//   db.query(sql, (err, result) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       if (!result || result.length === 0) {
//         res.writeHead(500, {
//           "Content-Type": "text/plain",
//         });
//         res.send({
//           status: "Result from Db Undefined",
//         });
//         return;
//       }

//       if (result[0].length > 0 && result[0][0].status !== "FAVORITES_CREATED") {
//         res
//           .status(400)
//           .send({ status: "FAVORITES_CREATION_FAILED", favId: -1 });
//         return;
//       }
//       res.send({
//         status: "FAVORITES_CREATED",
//         favId: result[0][0].favId,
//       });
//     } catch (error) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(error));
//     }
//   });
// });

// app.post("/updatefavourite", checkAuth, (req, res) => {
//   if (req.body.newisFav) {
//     // Create Favorite
//     const newFav = new Favorites({
//       restaurant_id: req.body.restaurentId,
//       customer_id: req.body.customerId,
//       is_fav: "true",
//     });

//     Favorites.findOne(
//       {
//         restaurant_id: req.body.restaurentId,
//         customer_id: req.body.customerId,
//         is_fav: "true",
//       },
//       (error, result) => {
//         if (error) {
//           res.status(400).send({ status: "Internal server error" });
//           return;
//         }
//         if (result) {
//           return res
//             .status(400)
//             .send({ status: "FAVORITES_CREATION_FAILED", favId: -1 });
//         } else {
//           newFav.save((err, data) => {
//             if (err) {
//               return res
//                 .status(400)
//                 .send({ status: "FAVORITES_CREATION_FAILED", favId: -1 });
//             } else {
//               return res.send({
//                 status: "FAVORITES_CREATED",
//                 favId: data._id,
//               });
//             }
//           });
//         }
//       }
//     );
//   } else {
//     // Delete if favorite exists
//     Favorites.deleteOne(
//       {
//         restaurant_id: req.body.restaurentId,
//         customer_id: req.body.customerId,
//         is_fav: "false",
//       },
//       (error, result) => {
//         if (error) {
//           res.status(400).send({ status: "Internal server error" });
//           return;
//         }
//         return res.send({
//           status: "FAVORITES_CREATED",
//           favId: result._id,
//         });
//       }
//     );
//   }
// });

app.post(
  "/ubereats/customerrestaurant/updatefavourite",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "updateFavoriteRestaurants",
      req.body,
      function (err, results) {
        console.log(
          "updateFavouriteRestaurants response from Kafka Backend ",
          results
        );
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
              return;
            } else if (errCode === 400) {
              res.status(400).send(results.data);
              return;
            }
            return;
          } else {
            res.send(results.data);
            return;
          }
        }
      }
    );
  }
);
