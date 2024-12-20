import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cardRouter from './routes/cardRoute.js';
import orderRoute from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://trend-aura-admin.vercel.app'], // Add Vercel URL here
    credentials: true
}));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cardRouter);
app.use('/api/order', orderRoute);

app.get('/', (req, res) => {
    res.send("API Working");
});

// Start the Server
app.listen(port, () => {
    console.log("Server Start on Port:" + port);
});
