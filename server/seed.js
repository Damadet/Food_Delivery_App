const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb+srv://user:alxpassword@cluster1.h6pxllx.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await console.log("connection made");
  } catch (err) {
    console.log(err.message);
  }
}
main();
