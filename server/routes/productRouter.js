const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const { MongoClient } = require("mongodb");

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// router.post("/addProduct", async (req, res) => {
//   const { Name, Adjective, Description, Price, Category } = req.body;
//   try {
//     let product = await productModel.findOne({ name: req.body.Name });
//     if (product) {
//       return res.status(409).send("product with given name already exists");
//     }

//     product = await new productModel({
//       name: Name,
//       adjective: Adjective,
//       description: Description,
//       price: Price,
//       category: Category,
//     });
//     await product.save();
//     res.send(product);
//   } catch (err) {
//     console.log(err.message);
//   }
// });
router.get("/products-by-categories", async (req, res) => {
  try {
    const products = await productModel.aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" },
        },
      },
      { $project: { name: "$_id", products: 1, _id: 0 } },
    ]);
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/addProduct", async (req, res) => {
  const { Name, Adjective, Description, Price, Category } = req.body;

  try {
    const uri =
      "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect();
    let product = await productModel.findOne({ name: req.body.Name });
    if (product) {
      return res.status(409).send("product with given name already exists");
    }
    const productsCollection = client.db("test").collection("products");

    products = {
      name: Name,
      adjective: Adjective,
      description: Description,
      price: Price,
      category: {
        _id: product._id,
        name: Category,
      },
    };
    await productsCollection.insertOne(products);
    res.send(products);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
