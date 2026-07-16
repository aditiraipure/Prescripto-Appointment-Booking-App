import doctorsModel from '../models/doctorsModel.js'; 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import validator from 'validator';

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

    if (isMatch) {
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
        const appointments = await appointmentModel.find({ docId: doctorId }).sort({ date: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error( error);
        res.json({ success: false, message: error.message });
    }
 }

 const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await doctorsModel.findById(req.doctorId).select('-password');
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    return res.json({ success: true, doctor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
 };

 const updateDoctorProfile = async (req, res) => {
  try {
    const { name, email, speciality, experience, degree, fees, address, about, available } = req.body;

    if (!name || !email || !speciality || !experience || !degree || fees === '' || fees == null || !about) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }
    if (Number(fees) < 0 || Number.isNaN(Number(fees))) {
      return res.status(400).json({ success: false, message: 'Consultation fees must be a valid amount' });
    }

    const emailOwner = await doctorsModel.findOne({ email, _id: { $ne: req.doctorId } });
    if (emailOwner) {
      return res.status(409).json({ success: false, message: 'Email is already used by another doctor' });
    }

    const updatedDoctor = await doctorsModel.findByIdAndUpdate(
      req.doctorId,
      {
        name: name.trim(),
        email: email.trim(),
        speciality: speciality.trim(),
        experience: experience.trim(),
        degree: degree.trim(),
        fees: Number(fees),
        address: {
          line1: address?.line1?.trim() || '',
          line2: address?.line2?.trim() || '',
        },
        about: about.trim(),
        available: Boolean(available),
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    return res.json({ success: true, message: 'Profile updated successfully', doctor: updatedDoctor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
 };


 export { changeAvailability, doctorList, loginDoctor, appointmentDoctor, getDoctorProfile, updateDoctorProfile };
