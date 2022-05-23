const mongoose = require("mongoose");


// create new user
const users = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String },
  location: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  admin: { type: Boolean, default: false },
  phone: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,

});


module.exports = mongoose.model("User", users);

