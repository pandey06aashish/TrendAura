import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {}; // Initialize cartData if undefined

    // Check if item already exists in cart and increment size quantity
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    // Update user's cart data in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add to cart" });
  }
};

// Placeholder functions for future development
const updateCart = async (req, res) => {

    try{
     const {userId,itemId,size,quantity}=req.body
     const userData=await userModel.findById(userId);
     let cartData=await userData.cartData;
     
     cartData[itemId][size]=quantity
     await userModel.findByIdAndUpdate(userId,{cartData}) 
     res.json({success:true,message:"Card Updated"})

    }catch(error){
         res.json({
            success:false,
            message:error.message
         })
    }
  // Logic for updating items in the cart
};

const getuserCart = async (req, res) => {
    try{
      const {userId}=req.body
      const userData=await userModel.findById(userId)
      let cartData=await userData.cartData;
      res.json({
        success:true ,cartData
      })
    }catch(error){
     console.log(error);
     res.json({
        success:false,
        message:error.message
     })
    }
};

export { addToCart, updateCart, getuserCart };
