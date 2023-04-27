const express = require("express");
const Order = require("../models/order");
const router = express.Router();
const paystack = require("../models/payment");

router.post("create-payment-intent", async (req, res) => {
  const https = require("https");
  const params = JSON.stringify({
    email: req.body.email,
    amount: req.body.amount,
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

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { orderItems, shippingAddress, userId } = req.body;
    console.log(shippingAddress);

    const totalPrice = calculateOrderAmount(orderItems);

    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod: "stripe",
      totalPrice,
      taxPrice,
      shippingPrice,
      user: "",
    });

    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: "ngn",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
