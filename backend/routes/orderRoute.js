import express from 'express';
import { allOrders, placeOrder, placeOrderRazor, placeOrderStripe, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/OrderControllers.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRoute = express.Router();

orderRoute.post('/list', adminAuth, allOrders); // Corrected name
orderRoute.post("/status", adminAuth, updateStatus);

// Payment routes
orderRoute.post('/place', authUser, placeOrder); // Corrected name
orderRoute.post("/stripe", authUser, placeOrderStripe); // Corrected name
orderRoute.post('/razorpay', authUser, placeOrderRazor);

orderRoute.post("/userorders", authUser, userOrders);

// Verify payment routes
orderRoute.post("/verifyStripe", authUser, verifyStripe);
orderRoute.post("/verifyRazorpay", authUser, verifyRazorpay);

export default orderRoute;
