const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");
const app = require("../app");
const { checkAuth } = require("../Utils/passport");
var kafka = require("../kafka/client");

const { secret } = require("../Utils/config");
const { CustomerDetails } = require("../Models/Models");

// app.get(
//   "/ubereats/owner/customerdetails/:customer_id",
//   checkAuth,
//   (req, res) => {
//     CustomerDetails.findOne({ _id: req.params.customer_id }, (err, data) => {
//       if (err || !data) {
//         res.status(400).send({ status: "CUSTOMER_DETAILS_FETCH_FAILURE" });
//         return;
//       }
//       let modifiedData = JSON.parse(JSON.stringify(data));
//       modifiedData.customer_id = data._id;
//       res.send({
//         status: "CUSTOMER_DETAILS",
//         customerDetails: modifiedData,
//       });
//     });
//   }
// );
app.get(
  "/ubereats/owner/customerdetails/:customer_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getOwnerCustomerDetails",
      req.params,
      function (err, results) {
        console.log(
          "getOwnerCustomerDetails response from Kafka Backend ",
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
