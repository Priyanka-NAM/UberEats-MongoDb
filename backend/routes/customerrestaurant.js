const jwt = require("jsonwebtoken");
const md5 = require("md5");
var kafka = require("../kafka/client");

const app = require("../app");
const { checkAuth } = require("../Utils/passport");
const { secret } = require("../Utils/config");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

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
