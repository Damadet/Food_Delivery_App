const express = require("express");
const crypto = require("crypto");
const usertoken = require("./models/token");
const userModel = require("./models/user");
const productModel = require("./models/product")
const jwt = require('jsonwebtoken');
const {validateUser, validate} = require("./middlewares/validator");
const mailer = require("./mailer/mail");
const cors = require('cors');
require('dotenv').config();
const db = require ('./db');


const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

const app = express();


const corsOptions = {
  origin: `http://localhost:${3000}`
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

db.on('error', console.error.bind(console, 'MongoDB connection error'));

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

app.post("/user", validateUser, validate, async (req, res) => {
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




app.get('/products', async (req, res) => {
  try{
    const products = await productModel.find()
    res.status(200).send({ data: products})
  } catch (err){
    res.status(400).send({ error: err })
  }
})

app.post("/addProduct", async (req, res) => {
  const { Name, Adjective, Description, Price, Category } = req.body;
  try {
    let product = await productModel.findOne({ name: req.body.Name });
    if (product) {
      return res.status(409).send("product with given name already exists");
    }
    
    product = await new productModel({
      name: Name,
      adjective: Adjective,
      description: Description,
      price: Price,
      category: Category
    });
    await product.save();
    res.send(product);

  } catch (err) {
    console.log(err.message);
  }
});

app.get('/products-by-categories', async(req, res) => {
  try{
    const products = await productModel.aggregate([
      { $match: {}},
      { $group: {
        _id: '$category',
        products: { $push: '$$ROOT'}
      }},
      { $project: {name: '$_id', products: 1, _id: 0}}
    ])
    res.status(200).send({ data: products})
  } catch (err) {
    res.status(400).send({ error: err })
  }
})



app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

