const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);