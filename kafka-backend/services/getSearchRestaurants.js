const { RestaurantDetails } = require("../Models/Models");

const addRestaurantIds = (Restaurants) => {
  const modifiedRestaurants = Restaurants.map((Restaurant) => {
    let modifiedRestaurant = JSON.parse(JSON.stringify(Restaurant));
    modifiedRestaurant.restaurant_id = Restaurant._id;
    modifiedRestaurant.is_search_result = 1;
    return modifiedRestaurant;
  });
  return modifiedRestaurants;
};

const addRestaurantIds2 = (Restaurants) => {
  const modifiedRestaurants = Restaurants.map((Restaurant) => {
    let modifiedRestaurant = JSON.parse(JSON.stringify(Restaurant));
    modifiedRestaurant.restaurant_id = Restaurant._id;
    modifiedRestaurant.is_search_result = 0;
    return modifiedRestaurant;
  });
  return modifiedRestaurants;
};

function handle_request(msg, callback) {
  RestaurantDetails.find({ restaurant_city: msg.search_input }, (err, data) => {
    if (err) {
      callback(null, {
        errCode: 400,
        data: { status: "RESTAURANTS_NOT_FOUND" },
      });
      return;
    }
    RestaurantDetails.find(
      { restaurant_city: { $ne: msg.search_input } },
      (err2, data2) => {
        if (err2) {
          callback(null, {
            errCode: 400,
            data: { status: "RESTAURANTS_NOT_FOUND" },
          });
          return;
        }
        const rem_restaurants = addRestaurantIds2(data2);
        const search_restaurants = addRestaurantIds(data);
        const all_restos = rem_restaurants.concat(search_restaurants);
        callback(null, {
          data: {
            status: "ALL_RESTAURANTS",
            allRestaurants: all_restos,
          },
        });
      }
    );
  });
}

exports.handle_request = handle_request;
