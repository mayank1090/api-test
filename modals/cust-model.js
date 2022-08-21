const mongoose = require("mongoose")

const cus_scheema = new mongoose.Schema({
     customer_id:{
        type: String,
        required:true
    },
     customer_email:{
        type: String,
        required:true,
        unique:true
    },
    customer_name:{
        type:String,
        required:true
    },
    
})

const cus_model = mongoose.model("Customers",cus_scheema)

module.exports = cus_model;