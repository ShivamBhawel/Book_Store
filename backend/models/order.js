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
        default:"order place",
        enum :["order placed" , "out for delivery" , "Deleverd" , "Cancelled" ],
    },
}, 
 {timestamps:true}
);

module.exports = mongoose.model("order", orderSchema);