const { RestaurantDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  RestaurantDetails.findOne(
    { _id: msg.restaurant_id },
    (err, restaurantdata) => {
      if (err || !restaurantdata) {
        callback(null, {
          errCode: 400,
          data: { status: "OWNER_PROFILE_DETAILS_FAILURE" },
        });
        return;
      }
      let modifiedData = JSON.parse(JSON.stringify(restaurantdata));
      modifiedData.restaurant_id = restaurantdata._id;
      callback(null, {
        data: {
          status: "OWNER_PROFILE_DETAILS",
          user: modifiedData,
        },
      });
    }
  );
}

exports.handle_request = handle_request;
