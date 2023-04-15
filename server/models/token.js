const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenschma = new Schema({
  userld: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const tokenmodel = new mongoose.model("token", tokenschma);

module.exports = tokenmodel;
