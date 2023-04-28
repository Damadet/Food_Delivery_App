const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateUser, validate } = require("../middlewares/validator");
const mailer = require("../mailer/mail");
require("dotenv").config();
const bcrypt = require("bcrypt");
const usertoken = require("../models/token");
const cookieparser = require("cookie-parser");

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

const createtoken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

router.post("/create-user", validateUser, validate, async (req, res) => {
  const { firstName, lastName, Email, Password, confirmPassword } = req.body;
  try {
    let user = await userModel.findOne({ email: req.body.Email });
    if (user) {
      return res.status(400).send("user with given email already exists");
    }
    user = await new userModel({
      first_name: firstName,
      last_name: lastName,
      email: Email,
      password: Password,
    });
    await user.save();
    res.send(user);

    const auth = createtoken(user_id);
    res.cookie("jwt", auth);

    const token = await new usertoken({
      userld: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    token.save();
    const url = `http://localhost:${PORT}/test/${user._id}/verify/${token.token}`;
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

router.post("/user/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (!Email.trim() || !Password.trim())
      return res.status(400).send("email or password is missing");

    const user = await userModel.findOne({ email: req.body.Email });
    if (!user) return res.status(400).send("User not found");

    //encrypts the password and compares it to the encrypted
    const isMatched = await bcrypt.compare(Password, user.password);
    if (!isMatched) return res.status(409).send("Wrong email/password");

    const token = createtoken(user_id);
    res.cookie("jwt", token);

    res.status(200).json({
      email: Email,
      fname: user.first_name,
      lname: user.last_name,
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
