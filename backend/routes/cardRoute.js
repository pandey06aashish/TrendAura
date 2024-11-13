import express from 'express';
import { addToCart, updateCart, getuserCart } from '../controllers/cartControllers.js';
import authUser from '../middleware/auth.js';

const cardRouter=express.Router();

cardRouter.post("/get",authUser,getuserCart)
 cardRouter.post("/add",authUser,addToCart);
 cardRouter.post ('/update',authUser,updateCart);

 export default cardRouter;