const mongoose = require('mongoose')
const productSchema= new mongoose.Schema({
  productName:String,
  productPrice:Number,
  productImage:String,
  productDescription:String,
  productCategory:String,
  
})

const productModel = mongoose.model('products',productSchema);
module.exports = productModel