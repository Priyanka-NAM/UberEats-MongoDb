const md5 = require("md5");
const { RestaurantDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  const password = msg.password;
  const hashedPassword = md5(password);
  const RestaurantUpdate = {
    $set: {
      is_owner: 1,
      name: msg.name,
      email_id: msg.email,
      password: hashedPassword,
      description: msg.description,
      phone_num: msg.phone_num,
      restaurant_address_line_one: msg.restaurant_address_line_one,
      restaurant_city: msg.restaurant_city,
      restaurant_state: msg.restaurant_state,
      restaurant_country: msg.restaurant_country,
      restaurant_zipcode: msg.restaurant_zipcode,
      image_file_path: msg.image_file_path,
      restaurant_start_time: msg.restaurant_start_time,
      restaurant_end_time: msg.restaurant_end_time,
      restaurant_week_start: msg.restaurant_week_start,
      restaurant_week_end: msg.restaurant_week_end,
      national_brand: msg.national_brand,
      delivery_type: msg.delivery_type,
    },
  };

  RestaurantDetails.updateOne(
    { _id: msg.restaurant_id },
    RestaurantUpdate,
    (error, result) => {
      if (error) {
        callback(null, { errCode: 400, data: { status: "NO_RESTAURANT_ID" } });
        return;
      }
      RestaurantDetails.findOne(
        { _id: msg.restaurant_id },
        (err, restaurantdata) => {
          if (err) {
            callback(null, {
              errCode: 400,
              data: { status: "CANNOT_GET_UPDATED_RESTAURANT_DETAILS" },
            });
            return;
          }
          let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
          modifiedData.restaurant_id = restaurantdata._id;
          callback(null, {
            data: {
              status: "RESTAURANT_UPDATED",
              user: modifiedData,
            },
          });
          return;
        }
      );
    }
  );
}

exports.handle_request = handle_request;
