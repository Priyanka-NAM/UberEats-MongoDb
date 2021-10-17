// router.get("/owner/:restaurant_id", (req, res) => {
//   const sql = `CALL restaurant_get("${req.params.restaurant_id}", "${req.body.email}");`;
//   db.query(sql, (err, result) => {
//     try {
//       if (err) {
//         throw err;
//       }
//       if (result && result.length > 0 && result[0][0]) {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end(JSON.stringify(result[0]));
//       }
//     } catch (error) {
//       res.writeHead(500, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(error));
//     }
//   });
// });

const jwt = require("jsonwebtoken");
const md5 = require("md5");
const app = require("../app");

const { secret } = require("../Utils/config");
const { CustomerDetails, RestaurantDetails } = require("../Models/Models");

app.post("/ubereats/profile/customer", (req, res) => {
  const hashedPassword = md5(req.body.password);

  const UserUpdate = {
    $set: {
      // customer_id: req.body.customer_id,
      name: req.body.name,
      email_id: req.body.email,
      password: hashedPassword,
      nick_name: req.body.nick_name,
      phone_num: req.body.phone_num,
      date_of_birth: req.body.date_of_birth,
      address_line_1: req.body.address_line_1,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipcode: req.body.zipcode,
      profile_pic_file_path: req.body.profile_pic_file_path,
    },
  };

  CustomerDetails.updateOne(
    { _id: req.body.customer_id },
    UserUpdate,
    (error, result) => {
      if (error) {
        console.log("Error in Customer Profile Update ", error);
        res.status(400).send({ status: "NO_CUSTOMER_ID" });
        return;
      }
      CustomerDetails.findOne(
        { _id: req.body.customer_id },
        (err, customerdata) => {
          if (err) {
            console.log("Error in Customer Profile Update ", error);
            res
              .status(400)
              .send({ status: "CANNOT_GET_UPDATED_CUSTOMER_DETAILS" });
            return;
          }
          res.send({
            status: "CUSTOMER_UPDATED",
            user: customerdata,
          });
        }
      );
    }
  );
});

app.post("/ubereats/profile/owner", (req, res) => {
  const hashedPassword = md5(req.body.password);

  const RestaurantUpdate = {
    $set: {
      name: req.body.name,
      email_id: req.body.email,
      password: hashedPassword,
      description: req.body.description,
      phone_num: req.body.phone_num,
      restaurant_address_line_one: req.body.restaurant_address_line_one,
      restaurant_city: req.body.restaurant_city,
      restaurant_state: req.body.restaurant_state,
      restaurant_country: req.body.restaurant_country,
      restaurant_zipcode: req.body.restaurant_zipcode,
      image_file_path: req.body.image_file_path,
      restaurant_start_time: req.body.restaurant_start_time,
      restaurant_end_time: req.body.restaurant_end_time,
      restaurant_week_start: req.body.restaurant_week_start,
      restaurant_week_end: req.body.restaurant_week_end,
      national_brand: req.body.national_brand,
      delivery_type: req.body.delivery_type,
    },
  };
  RestaurantDetails.updateOne(
    { _id: req.body.restaurant_id },
    RestaurantUpdate,
    (error, result) => {
      if (error) {
        console.log("Error in Restaurant Profile Update ", error);
        res.status(400).send({ status: "NO_RESTAURANT_ID" });
        return;
      }
      RestaurantDetails.findOne(
        { _id: req.body.restaurant_id },
        (err, restaurantdata) => {
          if (err) {
            console.log("Error in Restaurant Profile Update ", error);
            res
              .status(400)
              .send({ status: "CANNOT_GET_UPDATED_RESTAURANT_DETAILS" });
            return;
          }
          res.send({
            status: "RESTAURANT_UPDATED",
            user: restaurantdata,
          });
        }
      );
    }
  );
});

app.get("/ubereats/profile/owner/details/:restaurant_id", (req, res) => {
  RestaurantDetails.findOne(
    { _id: req.params.restaurant_id },
    (err, restaurantdata) => {
      if (err) {
        res.status(400).send({ status: "OWNER_PROFILE_DETAILS_FAILURE" });
        return;
      }
      res.send({
        status: "OWNER_PROFILE_DETAILS",
        user: restaurantdata,
      });
    }
  );
});
