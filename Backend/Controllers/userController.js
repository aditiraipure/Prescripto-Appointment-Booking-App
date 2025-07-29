import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import fs from "fs";
import doctorsModel from '../models/doctorsModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter valid email" });
    }
    if (password.length < 5) {
      return res.status(400).json({ success: false, message: "Enter strong password" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Api for user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }); 
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "9d",
    });
    res.status(200).json({success: true,message: "Login successful",token,userData: user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};



// api to det user data
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, userData: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// api to updateProfile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address, gender, dob } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // update fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    // parse address if it's JSON string
    if (address) {
      user.address = typeof address === 'string' ? JSON.parse(address) : address;
    }
    // update image if new file is uploaded
    if (req.file) {
      const imageData = fs.readFileSync(req.file.path);
      const base64Image = `data:${req.file.mimetype};base64,${imageData.toString("base64")}`;
      user.image = base64Image;
    }
    // save updates
    await user.save();
    // return updated user data
    const updatedUser = await userModel.findById(userId).select("-password");

    res.json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// api to book appointment
const bookAppointments = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorsModel.findById(docId).select('-password');
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }
    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;

  const appointmentData = {
  userId,
  docId,
  userData,
  docData,
  amount: docData.fees,
  slotDate,
  slotTime,
  slotData: `${slotDate} ${slotTime}`, 
  date: Date.now()
};
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorsModel.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: 'Appointment Booked' });

  } catch (error) {
    console.error("Booking error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// api to get userAppointment
const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    let appointments = await appointmentModel
    .find({ userId })
    .populate('docId', 'name image speciality address');
    const updatedAppointments = appointments.map((apt) => ({
      ...apt._doc,
      docData: apt.docId,
    }));
    res.json({ success: true, appointments: updatedAppointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// api to cancel bookAppointments
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.find({ _id: appointmentId });
    if (!appointmentData.length || appointmentData[0].userId !== userId) {
      return res.json({ success: false, message: 'Unauthorized action' });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
    const { docId, slotDate, slotTime } = appointmentData[0];
    const doctorData = await doctorsModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

    await doctorsModel.findByIdAndUpdate(docId, { slots_booked });
   return res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET
})


// api to make payment
const onlinePayment = async (req, res) => {
  try {
    const {appointmentId} = req.body
    const appointmentData= await appointmentModel.findById(appointmentId)
    if(!appointmentData || appointmentData.cancelled){
    return res.json({ success: false, message: "Appointment not fount" });
    }
    // creating options 
    const options ={
      amount:appointmentData.amount*100,
     currency: process.env.CURRENCY || "INR",
      receipt:appointmentId, 
    }
    // creation of an order
    const order = await razorpayInstance.orders.create(options); 
    res.status(200).json({ success: true, order }); 
  } catch (error) {
  console.error("Razorpay Error:", error.response ? error.response : error);
  res.status(500).json({ success: false, message: error.message });
}
};


// api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
    console.log(" Payment updated for appointment:", orderInfo.receipt);

    res.status(200).json({ success: true, message: "Payment successfull" });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};


export { registerUser ,loginUser ,getProfile ,updateProfile , bookAppointments , listAppointment , cancelAppointment,onlinePayment ,verifyRazorpay};
