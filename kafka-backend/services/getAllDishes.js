const { Dishes } = require("../Models/Models");

function handle_request(msg, callback) {
  Dishes.find(
    { restaurant_id: req.params.restaurant_id, isActive: "true" },
    (err, dishes) => {
      if (err) {
        callback(null, {
          errCode: 400,
          data: { status: "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND",}
        });
        return;
      }
      const modifiedDishes = dishes.map((dish) => {
        let modifiedDish = JSON.parse(JSON.stringify(dish));
        modifiedDish.dish_id = dish._id;
        return modifiedDish;
      });
      callback(null, {
        data: {
          status: "ALL_DISHES",
          allDishes: modifiedDishes,
        },
      });
      return;
    }
  );
}

exports.handle_request = handle_request;
