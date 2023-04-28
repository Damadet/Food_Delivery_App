const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateUser, validate } = require("../middlewares/validator");
const { transporter } = require("../mailer/mail");
require("dotenv").config();
const bcrypt = require("bcrypt");
const usertoken = require("../models/token");
const cookieparser = require("cookie-parser");
const tokenmodel = require("../models/token");

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

const createtoken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

router.post("/create-user", validateUser, validate, async (req, res) => {
  const { firstName, lastName, Email, Password } = req.body;
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
    const auth = createtoken(user._id);
    res.cookie("jwt", auth);

    const token = await new usertoken({
      userld: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    const PORT = 8080;
    token.save();
    const url = `http://localhost:${PORT}/${user._id}/verify/${token.token}`;
    const message = {
      from: "okoliechukwuebukathereson@gmail.com",
      to: Email,
      subject: "user verification",
      html: url,
    };

    await transporter.sendMail(message);
    res.send(user);
  } catch (err) {
    console.log(err.message);
  }
});
router.get("/:userid/verify/:token", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.userid });
    if (!user) {
      return res.status(400).send("invalid link");
    }
    const verifytoken = await tokenmodel.findOne({
      userid: user._id,
      tokenid: req.params.token,
    });
    if (!verifytoken) {
      return res.status(400).send("invalid link");
    }
    await user.updateOne({ _id: user._id, verified: true });
    await verifytoken.remove();
    res.send("email verification complete");
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (!Email.trim() || !Password.trim())
      return res.status(400).send("email or password is missing");

    const user = await userModel.findOne({ email: req.body.Email });
    if (!user) return res.status(400).send("User not found");

    //encrypts the password and compares it to the encrypted
    const isMatched = await bcrypt.compare(Password, user.password);
    if (!isMatched) return res.status(409).send("Wrong email/password");

    const token = createtoken(user._id);
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
