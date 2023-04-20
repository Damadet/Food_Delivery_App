const express = require("express");
const crypto = require("crypto");
const usertoken = require("./models/token");
const userModel = require("./models/user");
const productModel = require("./models/product");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const jwt = require("jsonwebtoken");
const { validateUser, validate } = require("./middlewares/validator");
const mailer = require("./mailer/mail");
// const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const app = express();

// const corsOptions = {
//   origin: `http://localhost:${3000}`,
// };
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use(userRoute);
app.use(userRoute);

app.use(userRoute);

app.use(productRoute);

app.use(productRoute);
app.use(productRoute);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
