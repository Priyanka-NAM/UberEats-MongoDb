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
  const DishUpdate = {
    $set: {
      restaurant_id: msg.restaurentId,
      name: msg.dishname,
      description: msg.dishdescription,
      image_file_path: msg.imageFilePath,
      category: msg.dishcategory,
      dish_type: msg.dishtype,
      price: msg.price,
      ingredients: msg.ingredients,
      isActive: msg.isActive,
    },
  };
  Dishes.updateOne(
    { _id: msg.dishId, restaurant_id: msg.restaurentId },
    DishUpdate,
    (error, result) => {
      if (error) {
        callback(null, { errCode: 400, data: { status: "NO_DISH_ID" } });
        return;
      }
      Dishes.findOne({ _id: msg.dishId }, (err, dishdata) => {
        if (err) {
          callback(null, {
            errCode: 400,
            data: { status: "CANNOT_GET_UPDATED_DISH_DETAILS" },
          });
          return;
        }
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
                status: "DISH_UPDATED",
                allDishes: addDishesIds(dishes),
              },
            });
            return;
          }
        );
      });
    }
  );
}

exports.handle_request = handle_request;
