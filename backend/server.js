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

// Middleware
app.use(express.json());

// CORS Configuration with Dynamic Origin
const allowedOrigins = [
    'http://localhost:5173', // Local
    'http://localhost:5174', // Local alternative
    'https://trend-aura-admin.vercel.app' // Production URL
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Explicitly handle CORS preflight requests
app.options('*', cors(corsOptions));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use("/api/cart", cardRouter);
app.use("/api/order", orderRoute);

app.get('/', (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log("Server started on Port:" + port);
});
