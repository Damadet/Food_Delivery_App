const express = require("express");

const router = express.Router();

router.get("/pay", async (req, res) => {
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

module.exports = router;
