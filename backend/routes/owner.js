const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");
const app = require("../app");
const { checkAuth } = require("../Utils/passport");

const { secret } = require("../Utils/config");
const { CustomerDetails } = require("../Models/Models");

app.get(
  "/ubereats/owner/customerdetails/:customer_id",
  checkAuth,
  (req, res) => {
    CustomerDetails.findOne({ _id: req.params.customer_id }, (err, data) => {
      if (err || !data) {
        res.status(400).send({ status: "CUSTOMER_DETAILS_FETCH_FAILURE" });
        return;
      }
      let modifiedData = JSON.parse(JSON.stringify(data));
      modifiedData.customer_id = data._id;
      res.send({
        status: "CUSTOMER_DETAILS",
        customerDetails: modifiedData,
      });
    });
  }
);
