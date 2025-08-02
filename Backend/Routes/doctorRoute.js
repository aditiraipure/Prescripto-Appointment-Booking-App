import express from 'express';
import {  doctorList ,changeAvailability,loginDoctor ,appointmentDoctor ,appointmentCancel,appointmentComplete, doctorDashboard} from '../Controllers/doctorController.js';
import authDoctor from '../middleWare/authDoctor.js';


const doctorRouter = express.Router();
doctorRouter.get('/List', doctorList);
doctorRouter.post('/change-availability', changeAvailability); 
doctorRouter.post("/login",loginDoctor);
doctorRouter.get("/appointments",authDoctor,appointmentDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor,doctorDashboard)



export default doctorRouter;