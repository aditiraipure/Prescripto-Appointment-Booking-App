import express from 'express';
import {  doctorList ,changeAvailability,loginDoctor ,appointmentDoctor} from '../Controllers/doctorController.js';
import authDoctor from '../middleWare/authDoctor.js';


const doctorRouter = express.Router();
doctorRouter.get('/List', doctorList);
doctorRouter.post('/change-availability', changeAvailability); 
doctorRouter.post("/login",loginDoctor);
doctorRouter.get("/appointments",authDoctor,appointmentDoctor);


export default doctorRouter;