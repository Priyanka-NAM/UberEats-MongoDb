const { Dishes } = require("../Models/Models");

const addDishesIds = (dishes) => {
  const modifiedDishes = dishes.map((dish) => {
    let modifiedDishData = JSON.parse(JSON.stringify(dish));
    modifiedDishData.dish_id = dish._id;
    return modifiedDishData;
  });
  return modifiedDishes;
};

function handle_request(msg, callback) {
  const newDish = new Dishes({
    restaurant_id: msg.restaurentId,
    name: msg.dishname,
    description: msg.dishdescription,
    image_file_path: msg.imageFilePath,
    category: msg.dishcategory,
    dish_type: msg.dishtype,
    ingredients: msg.ingredients,
    price: msg.price,
    isActive: "true",
  });

  Dishes.findOne(
    {
      restaurant_id: msg.restaurentId,
      name: msg.dishname,
      isActive: "true",
    },
    (error, result) => {
      if (error) {
        callback(null, {
          errCode: 400,
          data: { status: "Internal server error" },
        });
        return;
      }
      if (result) {
        callback(null, { errCode: 400, data: { status: "DISH_EXISTS" } });
        return;
      } else {
        newDish.save((err, data) => {
          if (err) {
            callback(null, {
              errCode: 400,
              data: { status: "DISH_COULDNOT_BE_ADDED" },
            });
            return;
          } else {
            Dishes.find(
              { restaurant_id: msg.restaurentId, isActive: "true" },
              (finderr, dishes) => {
                if (finderr) {
                  callback(null, {
                    errCode: 400,
                    data: { status: "RESTAURANT_ID_NULL" },
                  });
                  return;
                }
                callback(null, {
                  data: {
                    status: "DISH_ADDED",
                    allDishes: addDishesIds(dishes),
                  },
                });
                return;
              }
            );
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;
