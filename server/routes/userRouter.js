const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateUser, validate } = require("../middlewares/validator");
const mailer = require("../mailer/mail");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.send(users);
});

// router.post("/create-user", validateUser, validate, async (req, res) => {
//   const { firstName, lastName, Email, Password, confirmPassword } = req.body;
//   try {
//     let user = await userModel.findOne({ email: req.body.Email });
//     if (user) {
//       return res.status(400).send("user with given email already exists");}
//       if (!password === confirmPassword){
//         return res.status(400).send("Passwords need to match")
//       }
//     user = await new userModel({
//       first_name: firstName,
//       last_name: lastName,
//       email: Email,
//       password: Password,
//     });
//     await user.save();
//     res.send(user);

//     const token = await new usertoken({
//       userld: user._id,
//       token: crypto.randomBytes(32).toString("hex"),
//     });
//     token.save();
//     const url = `http://localhost:${PORT}/test/${user._id}/verify/${token.token}`;
//     const message = {
//       from: "okoliechukwuebukathereson@gmail.com",
//       to: Email,
//       subject: "user verification",
//       html: url,
//     };

//     await mailer.sendMail(message);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// router.post("/user/login", async (req, res) => {
//   const { Email, Password } = req.body;
//   try {
//     if (!Email.trim() || !Password.trim())
//       return res.status(400).send("email or password is missing");

//     const user = await userModel.findOne({ email: req.body.Email });
//     if (!user) return res.status(409).send("User not found");
//     const isMatched = await bcrypt.compare(user.password, Password);
//     if (!isMatched) return res.status(409).send("Wrong email/password");

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({
//       email: Email,
//       password: Password,
//       fname: user.first_name,
//       lname: user.last_name,
//       token: token,
//     });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

module.exports = router;
