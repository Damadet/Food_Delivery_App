const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema(
  {
    name:{
        type: String,
        required: true
    }
  }
)

const ProductSchema = new Schema(
  {
    name: {type: String, required: true},
    adjective: {type: String, required: true},
    description: {type: String, required: true},
    price:{type: String, required: true},
    category: {type: Object, required: true},
  }
)

const products = mongoose.model('product', ProductSchema);
module.exports = products