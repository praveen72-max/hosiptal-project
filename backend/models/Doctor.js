const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String },
  bio: { type: String }
});

module.exports = mongoose.model('Doctor', DoctorSchema);