const mongoose = require("mongoose");

const payment = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
});

const paystack = new mongoose.model("pay", payment);

module.exports = payment;
