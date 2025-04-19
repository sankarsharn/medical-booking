import mongoose from 'mongoose';
import '@/models/user.models';     // ensure 'User' model is registered
import '@/models/doctor.model';   // ensure 'Doctor' model is registered

const appointmentRequestSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  }
}, { timestamps: true });

export default mongoose.models.AppointmentRequest || mongoose.model('AppointmentRequest', appointmentRequestSchema);
