const express = require("express");
const crypto = require("crypto");
const usertoken = require("./models/token");
const model = require("./models/user");

const mongoose = require("mongoose");
const mailer = require("./mailer/mail");

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

  console.log(req);

  try {
    console.log(req.body.firstName);
    const user = await new model({
      first_name: firstName,
      last_name: lastName,
      email: Email,
      password: Password,
    });
    await user.save();
    res.send(user);

    const token = await new usertoken({
      userld: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    token.save();
    const url = `http://localhost:3000/test/${user._id}/verify/${token.token}`;
    const message = {
      from: "okoliechukwuebukathereson@gmail.com",
      to: Email,
      subject: "user verification",
      html: url,
    };

    await mailer.sendMail(message);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log("running on port 3000");
});
