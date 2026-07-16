import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './Config/mongodb.js';
import connectCloudinary from "./Config/cloudinary.js";
import adminRouter from "./Routes/adminRoute.js";
import doctorRouter from "./Routes/doctorRoute.js";
import userRouter from "./Routes/userRoute.js";

// Api config
const app = express()
const PORT = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middleWare
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/user', userRouter);

app.get('/',(req,res)=>{
    res.send('API WORKING')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});