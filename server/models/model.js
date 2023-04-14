const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: Number,
    require: true,
  },
});

const users = new mongoose.model("user", userSchema);

module.exports = users;
