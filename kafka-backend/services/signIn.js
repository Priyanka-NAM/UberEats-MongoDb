const jwt = require("jsonwebtoken");

const md5 = require("md5");

// const db = require("../Utils/connection");
const { secret } = require("../Utils/config");
// const app = require("../app");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  console.log("SignIn Request for Kafka Backend ==> ", msg);
  const email = msg.email;
  const password = msg.password;
  const hashedPassword = md5(password);
  RestaurantDetails.findOne(
    { email_id: email, password: hashedPassword },
    (error, result) => {
      if (error) {
        console.log(
          "Fetching restaurant details error in SignIn request handler"
        );
        callback(null, { errCode: 500, data: {} });
        // res.writeHead(500, {
        //   "Content-Type": "text/plain",
        // });
        // res.end();
        return;
      }
      if (result) {
        let modifiedData = JSON.parse(JSON.stringify(result));
        modifiedData.restaurant_id = result._id;
        const token = jwt.sign({ _id: result }, secret);
        // res.header("x-auth-token", token).send({
        //   status: "Authentication Successful",
        //   user: modifiedData,
        //   token,
        // });
        console.log("Restaurant Owner Authentication Success");
        callback(null, {
          data: {
            status: "Authentication Successful",
            user: modifiedData,
            token,
          },
        });
        return;
      } else {
        CustomerDetails.findOne(
          { email_id: email, password: hashedPassword },
          (error, result) => {
            if (error) {
              console.log(
                "Fetching customer details error in SignIn request handler"
              );
              callback(null, { errCode: 500, data: {} });
              //   res.writeHead(500, {
              //     "Content-Type": "text/plain",
              //   });
              //   res.end();
              return;
            }
            if (result) {
              let modifiedCustomerData = JSON.parse(JSON.stringify(result));
              modifiedCustomerData.customer_id = result._id;
              const token = jwt.sign({ _id: result }, secret);
              //   res.header("x-auth-token", token).send({
              //     status: "Authentication Successful",
              //     user: modifiedCustomerData,
              //     token,
              //   });
              console.log("Customer Authentication Success");
              callback(null, {
                data: {
                  status: "Authentication Successful",
                  user: modifiedCustomerData,
                  token,
                },
              });
              return;
            } else {
              //   res.status(400).send({ status: "Authentication Failed" });
              console.log("Authenticaion Failure - SignIn Request Handler");
              callback(null, {
                errCode: 400,
                data: { status: "Authentication Failed" },
              });
              return;
            }
          }
        );
      }
    }
  );
}

exports.handle_request = handle_request;
