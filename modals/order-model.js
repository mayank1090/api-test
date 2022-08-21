const mongoose = require("mongoose")

const odrscheema = new mongoose.Schema({
    customer_id:{
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
    quantity:{
        type:Number,
        required:true
    }
})

const ord_model = mongoose.model("Orders",odrscheema)

module.exports = ord_model;