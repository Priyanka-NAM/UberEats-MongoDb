const mongoose = require("mongoose");

const UserSignInSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("UserSignIn", UserSignInSchema);