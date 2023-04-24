const express = require("express");
const productModel = require("./models/product");
const userRoute = require("./routes/userRouter");
const productRoute = require("./routes/productRouter");
const paymentRoute = require("./routes/paymentRoute");
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


app.use("/api/", paymentRoute);

app.use("/api/", userRoute);

app.use("/api/", productRoute);



app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});



