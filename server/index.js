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

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const app = express();

// const corsOptions = {
//   origin: `http://localhost:${PORT}`,
// };
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);

app.use(paymentRoute);

app.use(userRoute);
app.use(userRoute);
app.use(userRoute);

app.use(userRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.use(productRoute);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
