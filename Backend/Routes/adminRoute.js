// adminRoute.js ✅
import express from 'express';
import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin , appointmentCancel,adminDashboard} from '../Controllers/adminController.js';
import upload from '../middleWare/multer.js';
import authAdmin from '../middleWare/authAdmin.js';
import { changeAvailability } from '../Controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.get('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointments', authAdmin, appointmentCancel)
adminRouter.get('/dashboard',authAdmin,adminDashboard)


export default adminRouter;
