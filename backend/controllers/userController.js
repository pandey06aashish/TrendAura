import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser=async(req,res)=>{
   try{
      const {email,password}=req.body;
      const user=await userModel.findOne({email})
      if(!user){
         return res.json({success:false,message:"User Not Exists"})
      }
      const isMatch=await bcrypt.compare(password,user.password);

      if(isMatch){
        const token=createToken(user._id)
        res.json({success:true,token})
      }
      else{
        res.json({success:false,message:"Invalid Credentials"})
      }
   }catch(error){
      console.log(error);
      res.json({success:false,message:error.message})
   }
}


// Route for user register

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Ensure password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);

        // Send success response with token
        res.status(201).json({ success: true, token, message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
};


// Route for admin login..

const adminLogin=async(req,res)=>{
 
    try{
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
          const token=jwt.sign(email+password,process.env.JWT_SECRET);
          res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({ success: false, message:error.message
         });
    }
}

export {loginUser,registerUser,adminLogin};