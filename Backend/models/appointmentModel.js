import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  docId: {type: mongoose.Schema.Types.ObjectId,ref: 'doctors',required: true,},
  userData: { type: Object, required: true },
  docData: { type: Object, required: true },
  amount: { type: Number, required: true },
   payment: { type: Boolean, default: false }, 
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  slotData: { type: String, required: true }, 
  date: { type: Date, default: Date.now },
  cancelled: { type: Boolean, default: false }
});


const appointmentModel = mongoose.models.appointment || mongoose.model('appointment',appointmentSchema)
export default appointmentModel