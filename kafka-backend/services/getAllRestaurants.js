const { RestaurantDetails } = require("../Models/Models");

function handle_request(msg, callback) {
  RestaurantDetails.find({}, (err, restaurantsdata) => {
    if (err) {
      callback(null, {
        errCode: 400,
        data: { status: "RESTAURANTS_NOT_FOUND" },
      });

      return;
    }
    const modifiedRestaurantsData = restaurantsdata.map((restaurant) => {
      let modifiedRestaurant = JSON.parse(JSON.stringify(restaurant));
      modifiedRestaurant.restaurant_id = restaurant._id;
      return modifiedRestaurant;
    });
    callback(null, {
      data: {
        status: "ALL_RESTAURANTS",
        allRestaurants: modifiedRestaurantsData,
      },
    });
    return;
  });
}

exports.handle_request = handle_request;
