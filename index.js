const express = require("express")
const { default: mongoose } = require("mongoose")
const cus_model = require("./modals/cust-model")
const customer = require("./modals/cust-model")
const Inventory = require("./modals/invt-model")
const orders = require("./modals/order-model")

const bodyparser = require("body-parser")
const inv_model = require("./modals/invt-model")
const ord_model = require("./modals/order-model")

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.listen(3001,(err)=>{
    if(!err){
        console.log("working")
    }
    else{
        console.log(err)
    }
})

mongoose.connect("mongodb://localhost:27017/web-tech",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})

app.get("/customer",(req,res)=>{
   cus_model.find().then((users)=>{
    res.send(users)
   })
})

app.post("/customer/add",(req,res)=>{
    cus_model.find({customer_email: req.body.customer_email}).then((user)=>{
        if(user.length){
            res.status(400).send("User Already Exist")
        }

        else{
            cus_model.create({customer_email:req.body.customer_email,customer_id:req.body.customer_id,customer_name:req.body.customer_name}).then((data)=>{
                res.send(data)
            }).catch((err)=>{
                
                console.log(err)
            })

        }
    })
})

app.get("/inventory",(req,res)=>{

    inv_model.find().then((wholeinventory)=>{
        res.send(wholeinventory)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/inventory/electronics",(req,res)=>{
      
    inv_model.find({inventory_type:"Electronics"}).then((inventory)=>{
        res.send(inventory)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/inventory/furniture",(req,res)=>{
      
    inv_model.find({inventory_type:"Furniture"}).then((inventory)=>{
        res.send(inventory)
    }).catch((err)=>{
        console.log(err)
    })
})

app.post("/customer/order",(req,res)=>{

    cus_model.find({customer_id:req.body.customer_id}).then(

        inv_model.find({inventory_id:req.body.inventory_id}).then((data)=>{
            const total = data[0].AVL_quantity
            const current = req.body.quantity 

            if (current<=total){
                ord_model.create({
                customer_id:req.body.customer_id,inventory_id:req.body.inventory_id,item_name:req.body.item_name,quantity:req.body.quantity
                }).then((data)=>{
                    inv_model.findOneAndUpdate({
                        inventory_id:req.body.inventory_id
                    },{AVL_quantity:total-current}).then(()=>{
                        res.send("order placed")
                    })
                })
            }
            else{
                res.send("Stock-out")
            }
        }).catch(()=>{
            res.send("wrong inventory ID")
        })
    ).catch(()=>{
        res.send("please login with correct ID ")
    })
})