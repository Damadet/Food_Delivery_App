const mongoose = require("mongoose");

const { Schema } = mongoose;

const loginScema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const log_in = new mongoose.model("login", loginSchema);

module.exports = log_in;