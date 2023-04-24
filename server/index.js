const express = require("express");
const crypto = require("crypto");
const usertoken = require("./models/token");
const userModel = require("./models/user");
const productModel = require("./models/product");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const paymentRoute = require("./routes/paymentRoute");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validateUser, validate } = require("./middlewares/validator");
const mailer = require("./mailer/mail");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const Order = require('./models/order')

const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

const app = express();
 //allows api calls from react app running on port 3000
const corsOptions = {
   origin: "http://localhost:3000",
 };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);

app.use(paymentRoute);

app.use(userRoute);
app.use(userRoute);
app.use(userRoute);

app.use("/api/", userRoute);

app.use("/api/", productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});



app.post('/create-payment-intent', async(req, res) => {
  try {
    const { orderItems, shippingAddress, userId } = req.body;
    console.log(shippingAddress);

    const totalPrice = calculateOrderAmount(orderItems);

    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({

      orderItems,
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
      taxPrice,
      shippingPrice,
      user: ''
    })

    // await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd'
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch(e) {
      res.status(400).json({
        error: {
          message: e.message
        }
      })
  }
})