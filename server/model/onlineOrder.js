const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    
  },
  quantity: {
    type: Number,
   
  }
});

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  email: {
    type: String,
   
  },
  phone: {
    type: String,
    
  },
  city: {
    type: String,
    
  },
  address: {
    type: String,
    
  },
  order: {
    type: [productSchema], // Array of products
    validate: {
      validator: function(val) {
        // Custom validation function to ensure array is not empty
        return val.length > 0;
      },
      message: 'Order must contain at least one product'
    }
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid',
    required: true
  },
  orderNo: {
    type: String,
    required: true,
    unique: true
  },
  orderType: {
    type: String,
    
  },
  orderStatus: {
    type: String,
    
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
