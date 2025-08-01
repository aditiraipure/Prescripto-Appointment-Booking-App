// models/doctorsModel.js
import mongoose from "mongoose";

  const doctorSchema = new mongoose.Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   image: { type: String, required: true },
   speciality: { type: String, required: true },
   degree: { type: String, required: true },
   experience: { type: String, required: true },
   about: { type: String, required: true },
   available: { type: Boolean, default: true },
   fees: { type: Number, required: true },
   address: { type: Object, required: true },
   date: { type: Date, default: Date.now },
   slots_booked: { type: Object, default: {} }
}, { minimize: false });

console.log("Doctor Model loaded");

const doctorsModel = mongoose.models.doctor || mongoose.model('doctors', doctorSchema);

export default doctorsModel;
