const { Favorites, RestaurantDetails } = require("../Models/Models");

const addRestaurantIds = (favRests) => {
  const modifiedRests = favRests.map((order) => {
    let modifiedOrder = JSON.parse(JSON.stringify(order));
    modifiedOrder.restaurant_id = order._id;
    return modifiedOrder;
  });
  return modifiedRests;
};

function handle_request(msg, callback) {
  Favorites.find(
    { customer_id: msg.customer_id, is_fav: "true" },
    (err, favdata) => {
      if (err) {
        callback(null, {
          errCode: 400,
          data: { status: "CUSTOMER_ID_IS_NULL" },
        });
        return;
      }
      var obj_ids = favdata.map(function (fav) {
        return fav.restaurant_id;
      });
      RestaurantDetails.find(
        { _id: { $in: obj_ids } },
        (error, restDetails) => {
          if (err) {
            callback(null, {
              errCode: 400,
              data: { status: "CUSTOMER_ID_IS_NULL" },
            });
            return;
          }
          callback(null, {
            data: {
              status: "FAV_RESTAURANTS",
              favRestaurants: addRestaurantIds(restDetails),
            },
          });
        }
      );
      return;
    }
  );
}

exports.handle_request = handle_request;
