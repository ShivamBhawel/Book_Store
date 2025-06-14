const router = require("express").Router();
const Order = require("../models/order");
const User  = require("../models/user");
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");

//place order 
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const id = req.headers.id;
    const order = req.body.order;

    for (const orderdata of order) {
      const neworder = new Order({ user: id, book: orderdata._id });
      const orderDataFromDb = await neworder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderdata._id },
      });
    }

    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Internal server Error !", error: err.message });
  }
});

router.get('/get-order-history' , authenticateToken , async (req,res) =>{

    try{
          const id = req.headers.id;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status:"Success",
            data: orderData,
        });
           
    }catch(err){

  res.status(500).json({
    Message: "Internal server error",
    error: err.message, 
  });
    }
} );

router.get('/get-all-order' , authenticateToken , async (req,res) =>{

    try{
         
        const userData = await Order.find()
        .populate({
             path:"orders",
        })
        .populate({
            path:"user",
        })
        .sort({createdAt: -1});
        return res.json({
            status:"Succes",
            data:userData,
        });      
    }catch(err){

        res.status(500).json({Message:"Internal server Error"});

    }
});


router.put('/update-status/:id',authenticateToken,async(req,res) => {
    try{
         const {id} = req.params;
         await Order.findByIdAndUpdate(id,{status:req.body.status});
         return res.json({
            status:"Success",
            message:"Status Updated Successfully",
         });
    }catch(err){
        res.status(500).json({Message:"Internal server Error !",err});
    }
})


   

module.exports = router;