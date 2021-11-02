// const jwt = require("jsonwebtoken");
// const md5 = require("md5");
// const passport = require("passport");
const app = require("../app");
const { checkAuth } = require("../Utils/passport");
var kafka = require("../kafka/client");

const { secret } = require("../Utils/config");
const { OrderDetails } = require("../Models/Models");

// const addOrderIds = (orders) => {
//   const modifiedOrders = orders.map((order) => {
//     let modifiedOrder = JSON.parse(JSON.stringify(order));
//     modifiedOrder.order_id = order._id;
//     return modifiedOrder;
//   });
//   return modifiedOrders;
// };
// app.get(
//   "/ubereats/orders/completedorders/restaurant/:restaurant_id",
//   checkAuth,
//   (req, res) => {
//     OrderDetails.find(
//       { restaurant_id: req.params.restaurant_id, order_status: "Completed" },
//       (err, data) => {
//         if (err) {
//           res.status(400).send({ status: "NO_RESTAURANT_ID" });
//           return;
//         }
//         res.send({
//           status: "COMPLETED_ORDERS",
//           orders: addOrderIds(data),
//         });
//       }
//     );
//   }
// );
app.get(
  "/ubereats/orders/completedorders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getCompletedOrders",
      req.params,
      function (err, results) {
        console.log("getCompletedOrders response from Kafka Backend ", results);
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
//   "/ubereats/orders/neworders/restaurant/:restaurant_id",
//   checkAuth,
//   (req, res) => {
//     OrderDetails.find(
//       { restaurant_id: req.params.restaurant_id, order_status: "Active" },
//       (err, data) => {
//         if (err) {
//           res.status(400).send({ status: "NO_RESTAURANT_ID" });
//           return;
//         }
//         res.send({
//           status: "NEW_ORDERS",
//           orders: addOrderIds(data),
//         });
//       }
//     );
//   }
// );

app.get(
  "/ubereats/orders/neworders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getNewOrders", req.params, function (err, results) {
      console.log("getNewOrders response from Kafka Backend ", results);
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

// app.get(
//   "/ubereats/orders/cancelledorders/restaurant/:restaurant_id",
//   checkAuth,
//   (req, res) => {
//     OrderDetails.find(
//       { restaurant_id: req.params.restaurant_id, order_status: "Cancelled" },
//       (err, data) => {
//         if (err) {
//           res.status(400).send({ status: "NO_RESTAURANT_ID" });
//           return;
//         }
//         res.send({
//           status: "CANCELLED_ORDERS",
//           orders: addOrderIds(data),
//         });
//       }
//     );
//   }
// );

app.get(
  "/ubereats/orders/cancelledorders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getCancelledOrders",
      req.params,
      function (err, results) {
        console.log("getCancelledOrders response from Kafka Backend ", results);
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
//   "/ubereats/orders/orderstatus/customer/:customer_id",
//   checkAuth,
//   (req, res) => {
//     OrderDetails.find({ customer_id: req.params.customer_id }, (err, data) => {
//       if (err) {
//         res.status(400).send({ status: "CUSTOMER_ID_NULL" });
//         return;
//       }
//       res.send({
//         status: "CUSTOMER_ORDERS",
//         orders: addOrderIds(data),
//       });
//     });
//   }
// );

app.get(
  "/ubereats/orders/orderstatus/customer/:customer_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getOrderStatus", req.params, function (err, results) {
      console.log("getOrderStatus response from Kafka Backend ", results);
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

// app.post("/ubereats/orders/customer/neworder", checkAuth, (req, res) => {
//   let dishes = [];
//   const cart_items = req.body.cart_items;
//   console.log(req.body);
//   for (let i = 0; i < cart_items.length; i += 1) {
//     dishes.push({
//       dish_id: cart_items[i].dish_id,
//       dish_name: cart_items[i].title,
//       quantity: cart_items[i].quantity,
//       price: cart_items[i].price,
//     });
//   }
//   const newOrder = new OrderDetails({
//     restaurant_id: req.body.restaurant_id,
//     customer_name: req.body.customerName,
//     restaurant_name: req.body.restaurant_name,
//     restaurant_city: req.body.restaurant_city,
//     restaurant_image_file_path: req.body.restaurant_image,
//     customer_id: req.body.customerId,
//     order_status: req.body.order_status,
//     delivery_status: req.body.delivery_status,
//     order_total: req.body.order_total,
//     tax: req.body.tax,
//     delivery_cost: req.body.delivery_cost,
//     gratitude: req.body.gratitude,
//     sub_total: req.body.sub_total,
//     order_delivery_type: req.body.order_delivery_type,
//     order_address_line_1: req.body.order_address_line_1,
//     order_city: req.body.order_city,
//     order_state: req.body.order_state,
//     order_country: req.body.order_country,
//     order_zipcode: req.body.order_zipcode,
//     dishes: dishes,
//     notes: req.body.notes,
//   });
//   newOrder.save((err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send({ status: "ORDER_CREATION_FAILED" });
//     } else {
//       OrderDetails.find(
//         { customer_id: req.body.customerId },
//         (finderr, allorders) => {
//           if (finderr) {
//             res.status(400).send({ status: "CUSTOMER_ID_NULL" });
//             return;
//           }
//           res.send({
//             status: "ORDER_CREATED",
//             orders: addOrderIds(allorders),
//           });
//         }
//       );
//     }
//   });
// });

app.post(
  "/ubereats/orders/customer/neworder",
  checkAuth,
  async function (req, res) {
    kafka.make_request("ordersNewOrderAdd", req.body, function (err, results) {
      console.log("ordersNewOrderAdd response from Kafka Backend ", results);
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

// app.post("/ubereats/orders/neworders/update", checkAuth, (req, res) => {
//   const OrderUpdate = {
//     $set: {
//       order_status: req.body.order_status,
//       delivery_status: req.body.delivery_status,
//       restaurant_id: req.body.restaurant_id,
//       order_id: req.body.order_id,
//     },
//   };
//   OrderDetails.updateOne(
//     { _id: req.body.order_id },
//     OrderUpdate,
//     (error, result) => {
//       if (error) {
//         console.log("Error in Order Update ", error);
//         res.status(400).send({ status: "NO_ORDER_ID" });
//         return;
//       }
//       OrderDetails.findOne({ _id: req.body.order_id }, (err, data) => {
//         if (err) {
//           res.status(400).send({ status: "NO_RESTAURANT_ID" });
//           return;
//         }
//         OrderDetails.find(
//           { restaurant_id: req.body.restaurant_id },
//           (finderr, allorders) => {
//             if (finderr) {
//               res.status(400).send({ status: "CUSTOMER_ID_NULL" });
//               return;
//             }
//             res.send({
//               status: "UPDATED_ORDER",
//               orders: addOrderIds(allorders),
//             });
//           }
//         );
//       });
//     }
//   );
// });

app.post(
  "/ubereats/orders/neworders/update",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "ordersNewOrderUpdate",
      req.body,
      function (err, results) {
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
