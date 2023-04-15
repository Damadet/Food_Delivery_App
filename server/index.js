const express = require("express");
const model = require("./models/model");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const uri = "mongodb://127.0.0.1:27017/app_test";

const connect = async (uri) => {
  await mongoose.connect(uri);
  await console.log("connected to mongodb");
};
connect(uri);
app.get("/", async (req, res) => {
  data = await model.find();
  res.send(data);
});

app.post("/user", async (req, res) => {
  const { firstName, lastName, Email, Password } = req.body;

  try {
    const user = await new model({
      first_name: firstName,
      last_name: lastName,
      email: Email,
      password: Password,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
