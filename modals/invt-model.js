const mongoose = require("mongoose")

const invscheema = new mongoose.Schema({
     inventory_type:{
        type:String,
        required:true
    },
    inventory_id:{
        type:String,
        required:true
    },
    item_name:{
        type:String,
        required:true
    },
     AVL_quantity:{
        type:Number,
        required:true
    }
})

const inv_model = mongoose.model("Inventory",invscheema)

module.exports = inv_model;