const { Favorites } = require("../Models/Models");

function handle_request(msg, callback) {
  if (msg.newisFav) {
    // Create Favorite
    const newFav = new Favorites({
      restaurant_id: msg.restaurentId,
      customer_id: msg.customerId,
      is_fav: "true",
    });

    Favorites.findOne(
      {
        restaurant_id: msg.restaurentId,
        customer_id: msg.customerId,
        is_fav: "true",
      },
      (error, result) => {
        if (error) {
          callback(null, { errCode: 500, data: {} });
          return;
        }
        if (result) {
          console.log("Fav already added => ", result);
          return callback(null, {
            errCode: 400,
            data: {
              status: "FAVORITES_CREATION_FAILED",
              favId: -1,
            },
          });
        } else {
          newFav.save((err, data) => {
            if (err) {
              console.log("Fav save failed");
              return callback(null, {
                errCode: 400,
                data: {
                  status: "FAVORITES_CREATION_FAILED",
                  favId: -1,
                },
              });
            } else {
              return callback(null, {
                data: {
                  status: "FAVORITES_CREATED",
                  favId: data._id,
                },
              });
            }
          });
        }
      }
    );
  } else {
    // Delete if favorite exists
    Favorites.findOne(
      {
        restaurant_id: msg.restaurentId,
        customer_id: msg.customerId,
        is_fav: "true",
      },
      (finderr, findresult) => {
        if (finderr) {
          callback(null, { errCode: 500, data: {} });
          return;
        }
        Favorites.deleteOne(
          {
            restaurant_id: msg.restaurentId,
            customer_id: msg.customerId,
            is_fav: "true",
          },
          (error, result) => {
            if (error) {
              callback(null, { errCode: 500, data: {} });
              return;
            }
            callback(null, {
              data: {
                status: "FAVORITES_CREATED",
                favId: findresult._id,
              },
            });
          }
        );
      }
    );
  }
}

exports.handle_request = handle_request;
