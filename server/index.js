const express = require("express");
const crypto = require("crypto");
const usertoken = require("./models/token");
const userModel = require("./models/user");
const {validateUser, validate} = require("./middlewares/validator")
const jwt = require('jsonwebtoken')
require('dotenv').config();
require ('./db')

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mailer = require("./mailer/mail");

const app = express();

app.use(express.json());


app.get("/pay", async (req, res) => {
  const https = require("https");
  const params = JSON.stringify({
    email: req.query.email,
    amount: req.query.amount,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_04f773dabdf48906f2e7a3312a2bc030f5fb7f0f",
      "Content-Type": "application/json",
    },
  };

  const reqpay = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  reqpay.write(params);
  reqpay.end();
});

app.get("/test/:id/verify/:token", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    if (!user) {
      return res.send("invalid link");
    }
    const token = await usertoken.findOne({
      userld: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.send("invalid link");
    }
    await user.updateOne({ _id: user._id, verified: true });
    await token.remove();
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/user/login", async(req, res) => {
  const { Email, Password } = req.body;
  try{
    if(!Email.trim() || !Password.trim()) return res.status(400).send("email or password is missing");

    const user = await userModel.findOne({ email: req.body.Email })
    if(!user) return res.status(409).send('User not found');
    const isMatched = await user.comparePassword(Password)
    if(!isMatched) return res.status(409).send('Wrong email/password');

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })
    
    res.json({email: Email, password: Password, fname: user.first_name, lname: user.last_name, token: token});
  }catch(err){
    console.log(err.message);
  }
})


app.post("u", async (req, res) => {
  const { Email, Password } = req.body;
  try{
    if(!Email.trim() || !Password.trim()) return res.status(400).send("email or password is missing");

    const user = await userModel.findOne({ email: req.body.Email });
    if(!user) return res.status(400).send('User not found');
    const isMatched = await user.comparePassword(Password)
    if(!isMatched) return res.status(409).send('Wrong email/password');

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    }) 
    res.json({success: true, user: {email: user.email, name: user.Name}})
  }catch (err) {
    console.log(err.message);
  }

})

app.post("/user", validateUser, validate, async (req, res) => {
  const { firstName, lastName, Email, Password } = req.body;
  try {
    let user = await userModel.findOne({ email: req.body.Email });
    if (user) {
      return res.status(409).send("user with given email already exists");
    }
    user = await new userModel({
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

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
