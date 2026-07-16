import express from 'express';
import { doctorList, changeAvailability, loginDoctor, appointmentDoctor, getDoctorProfile, updateDoctorProfile } from '../Controllers/doctorController.js';
import authDoctor from '../middleWare/authDoctor.js';


const doctorRouter = express.Router();
doctorRouter.get('/List', doctorList);
doctorRouter.post('/change-availability', changeAvailability); 
doctorRouter.post("/login",loginDoctor);
doctorRouter.get("/appointments",authDoctor,appointmentDoctor);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
doctorRouter.patch("/profile", authDoctor, updateDoctorProfile);


export default doctorRouter;
