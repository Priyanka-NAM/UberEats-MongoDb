const mongoose = require("mongoose");

const config = require("./config");

const mongoDB = config.mongoURI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});
