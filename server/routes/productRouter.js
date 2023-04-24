const express = require("express");
const router = express.Router();
const productModel = require("../models/product");

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/addProduct", async (req, res) => {
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
      category: Category,
    });
    await product.save();
    res.send(product);
  } catch (err) {
    console.log(err.message);
  }
});
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

module.exports = router;
