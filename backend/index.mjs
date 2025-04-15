import express from "express";
import mongoose from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"
import cartRoutes from "./routes/cartRoutes.mjs"
import productRoutes from "./routes/productRoutes.mjs"
import chalk from "chalk";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import dotenv from 'dotenv';
dotenv.config();
//Connecting MongoDB
connectToDB()
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
  
      'https://mern-hosting-practice-frontend.vercel.app',
      'https://mern-hosting-practice-frontend-*.vercel.app' // Wildcard for preview deployments
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Handle OPTIONS requests for all routes
app.options('*', cors());


app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/cart",cartRoutes)
app.use('/api/products', productRoutes);

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Your other routes...

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
