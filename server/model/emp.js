const mongoose = require('mongoose')
const employeeSchema= new mongoose.Schema({
  employeeName:String,
  employeeSalary:Number,
  employeeCnic:String,
  employeeImage:String,
  employeeCity:String,
  
  
})

const employeModel = mongoose.model('employe',employeeSchema);
module.exports =employeModel;