const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await console.log("connection made");
  } catch (err) {
    console.log(err.message);
  }
}
main();
