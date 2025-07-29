

import doctorsModel from '../models/doctorsModel.js';
import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

  const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    const imageFile = req.file;
    const existingDoctor = await doctorsModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor with this email already exists" });
    }

    if (!email || !password || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.status(400).json({ success: false, message: "Please fill all fields." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid Email." });
    }

    if (password.length < 5) {
      return res.status(400).json({ success: false, message: "Please enter a strong password." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image"
    });
    console.log("adminController loaded");
    console.log("doctorsModel type:", typeof doctorsModel);

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    };

    const newDoctor = new doctorsModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor Added" }); 
  } catch (error) {
    console.error('Error in addDoctor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// API for admin login 
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error in loginAdmin:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// api to get doctor list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorsModel.find({}).select("-password")
    res.json({ success: true, doctors });
  } catch (error) {
    console.error('Error in allDoctors:', error);
    res.json({ success: false, message: error.message });
  }
}

// api to get all appointments
const appointmentsAdmin = async (req,res)=>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true,appointments})
  } catch (error) {
     console.error(error);
    res.json({ success: false, message: error.message });
  }
}

// api to cancel appointment

const appointmentCancel = async (req, res) => {
  try {
     console.log("REQ BODY:", req.body); // ✅ Confirm data received
    const { appointmentId } = req.body;
         console.log("APPOINTMENT ID:", appointmentId); 

    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }
;


    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointment;

    const doctor = await doctorsModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const updatedSlots = { ...doctor.slots_booked };
    if (updatedSlots[slotDate]) {
      updatedSlots[slotDate] = updatedSlots[slotDate].filter(e => e !== slotTime);
    }

    await doctorsModel.findByIdAndUpdate(docId, { slots_booked: updatedSlots });

    return res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Cancel Appointment Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get dashboard doctorData

const adminDashboard = async (req,res) => {
try {
  const doctors = await doctorsModel.find({})
  const users = await userModel.find({})
  const appointments = await appointmentModel.find({})

  console.log("DOCTORS:", doctors); // 👈 Log array
    console.log("USERS:", users);
    console.log("APPOINTMENTS:", appointments);


  const dashData ={
    doctors:doctors.length,
    appointments:appointments.length,
    patients:users.length,
    latestAppointments:appointments.reverse()
  }
  res.json({success:true,dashData})
 
} catch (error) {
    return res.status(500).json({ success: false, message: error.message });
}
}

export { addDoctor ,loginAdmin , allDoctors ,appointmentsAdmin , appointmentCancel,adminDashboard};

