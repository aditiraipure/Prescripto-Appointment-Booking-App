import doctorsModel from '../models/doctorsModel.js'; 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

// controller: changeAvailability.js

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID missing" });
    }
    const doctor = await doctorsModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    doctor.available = !doctor.available;
    await doctor.save();
   res.status(200).json({success: true,message: "Availability changed",available: doctor.available});
  } catch (error) {
    console.error("Error in changeAvailability:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
 };

 const doctorList = async (req, res) => {
    try {
        const doctors = await doctorsModel.find({}).select('-password -email');
        res.json({ success: true, doctors });
    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
 }
 
//  doctors login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorsModel.findOne({email})

    if (!doctor) {
      return res.json({success:false,message:"Invalid credentials"})
    }

    const isMatch = await bcrypt.compare(password,doctor.password)

    if (!isMatch) {
      const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
      res.json({success:true,token})
    }
    else{
      return res.json({success:false,message:"Invalid credentials"})
    }
  } catch (error) {
    console.error( error);
        res.json({ success: false, message: error.message });
  }
};

// api to get doc appointment 
const appointmentDoctor = async (req, res) => {
    try {
         const doctorId = req.doctorId;  
        const appointments = await appointmentModel.find({ doctor: doctorId }).populate('patient');
        res.json({ success: true, appointments });
    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
 }


 export { changeAvailability, doctorList ,loginDoctor ,appointmentDoctor };