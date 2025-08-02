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

    const isMatch = await bcrypt.compare(password, doctor.password);

if (isMatch) {
  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
  return res.json({ success: true, token });
} else {
  return res.json({ success: false, message: "Invalid credentials" });
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
    const appointments = await appointmentModel.find({ docId: doctorId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to mark completed 
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.doctorId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized or appointment not found" });
    }
  } catch (error) {
    console.error("Complete Appointment Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Api to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.doctorId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId.toString() === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.status(403).json({ success: false, message: "Unauthorized or appointment not found" });
    }
  } catch (error) {
    console.error("Cancel Appointment Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Api to get dashboard data for doctor pannel
const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    console.log("Dashboard API hit by doctor:", doctorId);

    const appointments = await appointmentModel.find({ docId: doctorId });
    console.log("Total appointments found:", appointments.length);

    let earning = 0;
    appointments.map((item) => {
      if (item.isCompleted && item.payment) {
        earning += item.amount;
      }
    });

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 9),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Dashboard error:", error.message);
    res.json({ success: false, message: error.message });
  }
};



 export { changeAvailability, doctorList ,loginDoctor ,appointmentDoctor, appointmentComplete,appointmentCancel ,doctorDashboard};