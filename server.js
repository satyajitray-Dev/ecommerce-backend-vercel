import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.js"
import authroute from './routes/authroute.js';
import productroute from './routes/productroute.js';
import categoryroute from "./routes/categoryroute.js"
import cartroute from './routes/cartroute.js';
import addressroute from "./routes/addressroute.js";
import orderroute from "./routes/orderroute.js";
import {protect} from "./controller/authorizationcontroller.js";
import userroute from "./routes/userroute.js";

//import userSchema from './model/user.js'
//import productRoutes from './routes/productRoutes.js';


dotenv.config();
const PORT=process.env.port;
const app= express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth",authroute);
app.use("/api/product",protect,productroute);
app.use("/api/category",categoryroute);
app.use("/api/cart",cartroute);
app.use("/api/address",addressroute);
app.use("/api/order",orderroute);
app.use("/api/user",userroute);
connectDB();
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);

});
