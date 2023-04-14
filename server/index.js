const express = require("express");
const model = require("./models/model");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/app_test";

const connect = async (uri) => {
  await mongoose.connect(uri);
  await console.log("connected to mongo db");
};
connect(uri);
app.get("/", (req, res) => {});

app.post("/", (req, res) => {});

app.listen(3000, () => {
  console.log("running on port 3000");
});
