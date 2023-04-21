/*
const { MongoClient } = require("mongodb");
const { faker } = require('@faker-js/faker');
const _ = require("kodash")

async function main() {
  const uri = "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await console.log("connection made");

    const productCollection = client.db("test").collection("products");
    const categoriesCollection = client.db("test").collection("categories");
    let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => { return {name: category}})
    await categoriesCollection.insertMany(categories);

    let imageUrls = [
      'https://photo-cdn2.icons8.com/hbXW9WUH8CX9PKN2YwA1SFSw_3YKMz8JYFGEssfzuG0/rs:fit:1608:1072/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi8yYTA5YWU5YTU4/NTQ0YzllODE4ZTI5/ODM2MzNlMTNjMi5q/cGc.jpg'
    ]

     let products = [];
    for (let i =0; i < 10; i++){
      let newProduct = {
        name: faker.commerce.productName(),
        adjective: faker.commerce.productAdjective(),
        description: faker.commerce.description(),
        price: faker.commerce.price(),
        category: _.sample(categories),
        imageUrl: _.sample(imageUrls)
      };
      products.push(newProduct);
    }
    await productCollection.insertMany(products);

  } catch (err) {
    console.log(err.message);
  } finally {
    await client.close();
  }

} 

main(); */

const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");

async function main() {
    const uri = "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const productsCollection = client.db("test").collection("products");
        const categoriesCollection = client.db("test").collection("categories");

        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => { return { name: category } });
        await categoriesCollection.insertMany(categories);

        let imageUrls = [
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png',
        ]

        let products = [];
        for (let i = 0; i < 10; i+=1) {
            let newProduct = {
                name: faker.commerce.productName(),
                adjective: faker.commerce.productAdjective(),
                desciption: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: _.sample(categories),
                imageUrl: _.sample(imageUrls)
            };
            products.push(newProduct);
        }
        await productsCollection.insertMany(products);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();