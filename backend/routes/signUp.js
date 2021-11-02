const jwt = require("jsonwebtoken");
const md5 = require("md5");
const app = require("../app");
var kafka = require("../kafka/client");

const { secret } = require("../Utils/config");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

// app.post("/ubereats/signup/customer", (req, res) => {
//   const hashedPassword = md5(req.body.password);

//   const newUser = new CustomerDetails({
//     is_owner: 0,
//     name: req.body.name,
//     email_id: req.body.email,
//     password: hashedPassword,
//     address_line_1: req.body.address_line_1,
//     city: req.body.city,
//     state: req.body.state,
//     country: req.body.country,
//     zipcode: req.body.zipcode,
//   });

//   CustomerDetails.findOne({ email_id: req.body.email }, (error, result) => {
//     if (error) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//     }
//     if (result) {
//       res.status(400).send({ status: "USER_EXISTS" });
//     } else {
//       newUser.save((err, data) => {
//         if (err) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           res.end();
//         } else {
//           let modifiedData = JSON.parse(JSON.stringify(data));
//           modifiedData.customer_id = data._id;
//           const token = jwt.sign({ _id: data }, secret);
//           res.header("x-auth-token", token).send({
//             status: "USER_ADDED",
//             user: modifiedData,
//             token,
//           });
//         }
//       });
//     }
//   });
// });

app.post("/ubereats/signup/customer", async function (req, res) {
  kafka.make_request("signUpCustomer", req.body, function (err, results) {
    console.log("Sign Up response from Kafka Backend ", results);
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

// app.post("/ubereats/signup/owner", (req, res) => {
//   const hashedPassword = md5(req.body.password);

//   const newUser = new RestaurantDetails({
//     is_owner: 1,
//     name: req.body.name,
//     email_id: req.body.email,
//     password: hashedPassword,
//     restaurant_address_line_one: req.body.restaurant_address_line_one,
//     restaurant_city: req.body.restaurant_city,
//     restaurant_state: req.body.restaurant_state,
//     restaurant_country: req.body.restaurant_country,
//     restaurant_zipcode: req.body.restaurant_zipcode,
//   });

//   RestaurantDetails.findOne({ email_id: req.body.email }, (error, result) => {
//     if (error) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end();
//     }
//     if (result) {
//       res.status(400).send({ status: "RESTAURANT_ALREADY_EXISTS" });
//     } else {
//       newUser.save((err, data) => {
//         if (err) {
//           res.writeHead(500, {
//             "Content-Type": "text/plain",
//           });
//           res.end();
//         } else {
//           let modifiedData = JSON.parse(JSON.stringify(data));
//           modifiedData.restaurant_id = data._id;
//           const token = jwt.sign({ _id: data }, secret);
//           jwt.verify(token, secret);
//           res.header("x-auth-token", token).send({
//             status: "RESTAURANT_ADDED",
//             user: modifiedData,
//             token,
//           });
//         }
//       });
//     }
//   });
// });

app.post("/ubereats/signup/owner", async function (req, res) {
  kafka.make_request("signUpOwner", req.body, function (err, results) {
    console.log("Sign Up response from Kafka Backend ", results);
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
