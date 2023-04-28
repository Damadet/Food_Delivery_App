const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const categoryModel = require("../models/category");
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get("/products", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//update a product
router.put('/products/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    if(!product){
      return res.status(404).send("Cannot find product with name")
    }
    const updatedProduct = await productModel.findById(id)
    res.status(200).json(updatedProduct);
  }catch (err){
    res.status(500).send(err.message)
  }
})

router.post("/addProduct", async (req, res) => {
  const { Name, Adjective, Description, Price, Category, ImageUrl } = req.body;
  try {
    let product = await productModel.findOne({ name: req.body.Name });
    if (product) {
      return res.status(409).send("product with given name already exists");
    }
    cate = await categoryModel.findOne({ name: Category})
    await client.connect();
        const productsCollection = client.db("test").collection("products");

        let newProduct = {
          name: Name,
          adjective: Adjective,
          description: Description,
          price: Price,
          category: cate,
          imageUrl: ImageUrl
        }
        await productsCollection.insertMany([newProduct]);

    // product = await new productModel({
    //   name: Name,
    //   adjective: Adjective,
    //   description: Description,
    //   price: Price,
    //   category: cate,
    //   imageUrl: ImageUrl
    // });
    // await product.save();
    // res.send(product);
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
