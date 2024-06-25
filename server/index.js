const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer  = require('multer')
const categoryModel = require('./model/category')
const productModel = require('./model/product')
const employeModel = require('./model/emp')
const app = express()
const path = require('path');
const Order= require('./model/onlineOrder')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false })); // Add this line for form data parsing

mongoose.connect('mongodb://localhost:27017/DineNxt')

/// category////

app.post("/addCategory",(req,res) =>{
  categoryModel.create(req.body)
  .then(categories=>res.json(categories))
  .catch(err =>res.json(err))
})

app.get('/findCategory',(req,res)=>{
  categoryModel.find({})
  .then(categories=>res.json(categories))
  .catch(err =>res.json(err))
})

app.get('/updateCategory/:id',(req,res)=>{
  const id = req.params.id
  categoryModel.findByIdAndUpdate({_id:id})
  .then(categories=>res.json(categories))
  .catch(err =>res.json(err))
})

app.put('/newUpdateCategory/:id', (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;

  categoryModel.findByIdAndUpdate(id, { categoryName }, { new: true })
    .then(updatedCategory => res.json(updatedCategory))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/deleteUser/:id',(req,res) => {
const id =req.params.id;
categoryModel.findByIdAndDelete({_id:id})
.then(res=>res.json)
.catch(err=>res.json(err))
})

// category//////  END


// Product////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post("/addProduct", upload.single("productImage"), async (req, res) => {
  try {
    const { productName, productPrice, productCategory, productDescription } = req.body;
    const productImage = req.file ? req.file.path : ''; // Check if req.file exists before accessing path
    const newProduct = new productModel({
      productName,
      productPrice,
      productCategory,
      productImage,
      productDescription,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/findProduct',(req,res)=>{
  productModel.find({})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.get('/updateProduct/:id',(req,res)=>{
  const id = req.params.id
  productModel.findByIdAndUpdate({_id:id})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.put('/newUpdateProduct/:id', (req, res) => {
  const id = req.params.id;
  const { productName } = req.body;

  productModel.findByIdAndUpdate(id, { productName }, { new: true })
    .then(updatedProduct => res.json(updatedProduct))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/deleteProduct/:id',(req,res) => {
const id =req.params.id;
productModel.findByIdAndDelete({_id:id})
.then(res=>res.json)
.catch(err=>res.json(err))
})


//////////// Emplyee ///////////

app.post("/addEmp", upload.single("employeeImage"), async (req, res) => {
  try {
    const { employeeName, employeeCnic, employeeSalary, employeeCity } = req.body;
    const employeeImage = req.file ? req.file.path : ''; // Ensure req.file exists before accessing path

    const newEmployee = new employeModel({
      employeeName,
      employeeCnic,
      employeeSalary,
      employeeImage,
      employeeCity,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get('/findEmployee',(req,res)=>{
  employeModel.find({})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.get('/updateEmployee/:id',(req,res)=>{
  const id = req.params.id
  employeModel.findByIdAndUpdate({_id:id})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.put('/newUpdateEmployee/:id', (req, res) => {
  const id = req.params.id;
  const { productName } = req.body;

  employeModel.findByIdAndUpdate(id, { productName }, { new: true })
    .then(updatedProduct => res.json(updatedProduct))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/deleteEmployee/:id',(req,res) => {
const id =req.params.id;
employeModel.findByIdAndDelete({_id:id})
.then(res=>res.json)
.catch(err=>res.json(err))
})



app.post("/addOrder", (req, res) => {
  
  const { name, email, phone, city, address, order, amount, paymentStatus, orderNo ,orderStatus,  orderType } = req.body;

  // Assuming `order` is an array of products [{ name: '', price: '', quantity: '' }]
  Order.create({
    name, // Name of the customer placing the order
    email, // Email of the customer
    phone, // Phone number of the customer
    city, // City of the customer
    address, // Address of the customer
    order, // Array of products in the order
    amount, // Total amount of the order
    paymentStatus, // Payment status of the order (e.g., 'unpaid' or 'paid')
    orderNo,
    orderStatus,
    orderType,
   
  })
  .then(order => res.json(order))
  .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/findOnlineOrder',(req,res)=>{
  Order.find({})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.get('/updateOnline/:id',(req,res)=>{
  const id = req.params.id
  Order.findByIdAndUpdate({_id:id})
  .then(products=>res.json(products))
  .catch(err =>res.json(err))
})

app.put('/newupdateOnline/:orderNo', (req, res) => {
  const orderNo = req.params.orderNo;
  const { orderStatus } = req.body;

  Order.findOneAndUpdate({ orderNo }, { orderStatus }, { new: true })
    .then(updatedOrder => res.json(updatedOrder))
    .catch(err => res.status(400).json({ error: err.message }));
});









app.listen(3001,()=>{
  console.log('server is running')
})