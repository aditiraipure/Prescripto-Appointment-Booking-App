import express from 'express';
import {  registerUser , loginUser , getProfile, updateProfile , bookAppointments , listAppointment , cancelAppointment , onlinePayment , verifyRazorpay} from '../Controllers/userController.js';
import authUser from '../middleWare/authUser.js';
import upload from '../middleWare/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'),authUser,updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointments);
userRouter.get('/appointments', authUser, listAppointment);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/online-payment', authUser, onlinePayment);
userRouter.post('/verify-razorpay', authUser, verifyRazorpay);

export default userRouter;