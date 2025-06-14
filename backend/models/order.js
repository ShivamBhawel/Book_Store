const mongoose = require("mongoose");
const { type } = require("os");

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books",
    },
    status:{
        type:String,
        default: "order placed",
       enum: ["order placed", "out for delivery", "Delivered", "Cancelled"]
    },
}, 
 {timestamps:true}
);

module.exports = mongoose.model("orders", orderSchema);