/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
// const express = require("express");
// const util = require("util");
// const Promise = require("promise");
// const configure = require("config");
// require("dotenv").config();
// const db = require("../Utils/connection");

const dishDetails = (order) => {
  return {
    dish_id: order.dish_id,
    quantity: order.quantity,
    price: order.price,
    dish_name: order.dish_name,
    description: order.description,
    ingredients: order.ingredients,
    image_file_path: order.image_file_path,
    category: order.category,
    cuisine_type: order.cuisine_type,
    nadish_typeme: order.dish_type,
    dish_start_time: order.dish_start_time,
    dish_end_time: order.dish_end_time,
    is_active: order.is_active,
  };
};

const OrderCustomerRestaurantDetails = (order) => {
  const orderClone = { ...order };
  [
    "dish_id",
    "quantity",
    "price",
    "dish_name",
    "description",
    "ingredients",
    "image_file_path",
    "category",
    "cuisine_type",
    "dish_type",
    "dish_start_time",
    "dish_end_time",
    "is_active",
  ].forEach((e) => delete orderClone[e]);
  return orderClone;
};

const groupBy = (objectArray, property) => {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(dishDetails(obj));
    return acc;
  }, {});
};

const orderProcessing = (orders) => {
  const groupedByOrderIdDishes = groupBy(orders, "order_id");
  const orderMap = new Map();
  for (let i = 0; i < orders.length; i += 1) {
    const { order_id: orderId } = orders[i];
    orders[i].dishes = groupedByOrderIdDishes[orderId];
    orderMap.set(orderId, OrderCustomerRestaurantDetails(orders[i]));
  }

  const processedOrders = [];
  for (const val of orderMap.values()) {
    processedOrders.push(val);
  }
  return processedOrders;
};

router.get("/completedorders/restaurant/:restaurant_id", (req, res) => {
  const sql = `CALL restaurant_orders_get_status(${req.params.restaurant_id},"Completed");`;
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
        result[0][0].status === "RESTAURANT_ID_NULL"
      ) {
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }

      res.send({
        status: "COMPLETED_ORDERS",
        orders: orderProcessing(result[0]),
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});
router.get("/neworders/restaurant/:restaurant_id", (req, res) => {
  const sql = `CALL restaurant_orders_get_status(${req.params.restaurant_id},"Active");`;
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
        result[0][0].status === "RESTAURANT_ID_NULL"
      ) {
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }

      res.send({
        status: "NEW_ORDERS",
        orders: orderProcessing(result[0]),
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});
router.get("/cancelledorders/restaurant/:restaurant_id", (req, res) => {
  const sql = `CALL restaurant_orders_get_status(${req.params.restaurant_id},"Cancelled");`;
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
        result[0][0].status === "RESTAURANT_ID_NULL"
      ) {
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }

      res.send({
        status: "CANCELLED_ORDERS",
        orders: orderProcessing(result[0]),
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.post("/neworders/update", (req, res) => {
  const { restaurant_id, order_id, delivery_status, order_status } = req.body;
  const sql = `CALL restaurant_update_order(${restaurant_id},${order_id},"${delivery_status}","${order_status}");`;
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
        result[0][0].status === "RESTAURANT_ID_OR_ORDER_ID_IS_NULL"
      ) {
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }

      res.send({
        status: "UPDATED_ORDER",
        orders: orderProcessing(result[0]),
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.get("/orderstatus/customer/:customer_id", (req, res) => {
  const sql = `CALL customer_orders_get(${req.params.customer_id});`;
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
      if (result[0].length > 0 && result[0][0].status === "CUSTOMER_ID_NULL") {
        res.status(400).send({ status: "CUSTOMER_ID_NULL" });
        return;
      }
      res.send({
        status: "CUSTOMER_ORDERS",
        orders: orderProcessing(result[0]),
      });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

router.post("/customer/neworder", (req, res) => {
  console.log("Inside Customer New Order");
  const {
    customerId,
    restaurant_id,
    order_total,
    tax,
    delivery_cost,
    gratitude,
    sub_total,
    delivery_status,
    order_status,
    cart_items,
    order_delivery_type,
    order_address_line_1,
    order_city,
    order_state,
    order_country,
    order_zipcode,
  } = req.body;
  console.log("Customer New Order", req.body);
  const sql = `CALL customer_create_order(${customerId},${restaurant_id},"${order_status}","${delivery_status}",${sub_total},${tax},${delivery_cost},"${gratitude}",${order_total}, "${order_delivery_type}",'${order_address_line_1}','${order_city}','${order_state}','${order_country}','${order_zipcode}');`;
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
        result[0][0].status === "ORDER_CREATION_FAILED"
      ) {
        res.status(400).send({ status: "ORDER_CREATION_FAILED" });
        return;
      }

      const { order_id } = result[0][0];
      const dbQueryAsync = util.promisify(db.query).bind(db); // const util = require("util")
      Promise.all(
        cart_items.map((dish) => {
          const innerSql = `CALL customer_create_order_items(${dish.dishDetails.dish_id},${dish.quantity},${dish.price}, ${order_id})`;
          console.log("Order Items SQL", innerSql);
          return dbQueryAsync(innerSql);
        })
      )
        .then((allData) => {
          // All data available here in the order of the elements in the array
          console.log(
            "All date from order item posts ",
            JSON.stringify(allData)
          );
          res.send({
            status: "ORDER_CREATED",
            // orders: orderProcessing(result[0]),
          });
        })
        .catch((error) => {
          console.log(
            "Error while posting order items -> ",
            JSON.stringify(error)
          );
          res.end(
            JSON.stringify({
              status: "ORDER_ITEMS_CREATION_FAILED",
              // orders: orderProcessing(result[0]),
            })
          );
        });
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(error));
    }
  });
});

const jwt = require("jsonwebtoken");
const md5 = require("md5");
const app = require("../app");

const { secret } = require("../Utils/config");
const {
  CustomerDetails,
  OrderDetails,
  RestaurantDetails,
} = require("../Models/Models");

app.get(
  "/ubereats/orders/completedorders/restaurant/:restaurant_id",
  (req, res) => {
    OrderDetails.find(
      { restaurant_id: req.params.restaurant_id, order_status: "Completed" },
      (err, data) => {
        if (err) {
          res.status(400).send({ status: "NO_RESTAURANT_ID" });
          return;
        }
        res.send({
          status: "COMPLETED_ORDERS",
          orders: orderProcessing(data),
        });
      }
    );
  }
);

app.get("/ubereats/orders/neworders/restaurant/:restaurant_id", (req, res) => {
  OrderDetails.find(
    { restaurant_id: req.params.restaurant_id, order_status: "Active" },
    (err, data) => {
      if (err) {
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }
      res.send({
        status: "NEW_ORDERS",
        orders: orderProcessing(data),
      });
    }
  );
});

app.get(
  "/ubereats/orders/cancelledorders/restaurant/:restaurant_id",
  (req, res) => {
    OrderDetails.find(
      { restaurant_id: req.params.restaurant_id, order_status: "Cancelled" },
      (err, data) => {
        if (err) {
          res.status(400).send({ status: "NO_RESTAURANT_ID" });
          return;
        }
        res.send({
          status: "CANCELLED_ORDERS",
          orders: orderProcessing(data),
        });
      }
    );
  }
);

app.get("/ubereats/orders/orderstatus/customer/:customer_id", (req, res) => {
  OrderDetails.find({ customer_id: req.params.customer_id }, (err, data) => {
    if (err) {
      res.status(400).send({ status: "CUSTOMER_ID_NULL" });
      return;
    }
    res.send({
      status: "CUSTOMER_ORDERS",
      orders: orderProcessing(data),
    });
  });
});
