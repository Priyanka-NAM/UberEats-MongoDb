const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");

const app = require("../app");

const { secret } = require("../Utils/config");
const { RestaurantDetails, Dishes } = require("../Models/Models");
const { checkAuth } = require("../Utils/passport");

// const checkAuth = passport.authenticate("jwt", { session: false });
app.post("/ubereats/dishes/adddish", checkAuth, (req, res) => {
  const newDish = new Dishes({
    restaurant_id: req.body.restaurentId,
    dishname: req.body.dishname,
    dishdescription: req.body.dishdescription,
    image_file_path: req.body.imageFilePath,
    dishcategory: req.body.dishcategory,
    dishtype: req.body.dishtype,
    ingredients: req.body.ingredients,
    price: req.body.price,
    isActive: "true",
  });

  Dishes.findOne(
    { restaurant_id: req.body.restaurentId, dishname: req.body.dishname },
    (error, result) => {
      if (error) {
        res.status(400).send({ status: "Internal server error" });
        return;
      }
      if (result) {
        res.status(400).send({ status: "DISH_EXISTS" });
      } else {
        newDish.save((err, data) => {
          if (err) {
            res.status(400).send({ status: "DISH_COULDNOT_BE_ADDED" });
          } else {
            res.send({
              status: "DISH_ADDED",
              allDishes: data,
            });
          }
        });
      }
    }
  );
});

app.post("/ubereats/dishes/updatedish", checkAuth, (req, res) => {
  const DishUpdate = {
    $set: {
      dishId: req.body.dishId,
      restaurant_id: req.body.restaurentId,
      dishname: req.body.dishname,
      dishdescription: req.body.dishdescription,
      image_file_path: req.body.imageFilePath,
      dishcategory: req.body.dishcategory,
      dishtype: req.body.dishtype,
      price: req.body.price,
      ingredients: req.body.ingredients,
      isActive: req.body.isActive,
    },
  };
  Dishes.updateOne(
    { _id: req.body.dishId, restaurant_id: req.body.restaurentId },
    DishUpdate,
    (error, result) => {
      if (error) {
        console.log("Error in dish Update ", error);
        res.status(400).send({ status: "NO_DISH_ID" });
        return;
      }
      Dishes.findOne({ _id: req.body.dishId }, (err, dishdata) => {
        if (err) {
          console.log("Error in dish Update ", error);
          res.status(400).send({ status: "CANNOT_GET_UPDATED_DISH_DETAILS" });
          return;
        }
        res.send({
          status: "DISH_UPDATED",
          allDishes: dishdata,
        });
      });
    }
  );
});

app.get("/ubereats/dishes/updatedish/:restaurant_id", checkAuth, (req, res) => {
  Dishes.find({ restaurant_id: req.params.restaurant_id }, (err, dishes) => {
    if (err) {
      res
        .status(400)
        .send({ status: "DISHES_WITH_RESTAURANT_ID_NULL_NOT_FOUND" });
      return;
    }
    res.send({
      status: "ALL_DISHES",
      allDishes: dishes,
    });
  });
});
