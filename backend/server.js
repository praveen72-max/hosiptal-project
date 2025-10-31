const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hospitaldb';
mongoose.connect(MONGO_URI).then(()=> console.log('MongoDB connected')).catch(err=> console.error(err));

// Get doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const docs = await Doctor.find();
    res.json(docs);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// Seed doctors (for quick demo)
app.post('/api/seed-doctors', async (req, res) => {
  try {
    const sample = [
      { name: 'Dr. Asha Patel', department: 'Cardiology', bio: 'MD, Cardiology' },
      { name: 'Dr. Ramesh Kumar', department: 'Orthopedics', bio: 'MD, Orthopedics' }
    ];
    await Doctor.deleteMany({});
    const saved = await Doctor.insertMany(sample);
    res.json({ seeded: true, doctors: saved });
  } catch (err) { res.status(500).json({ error: 'Seed failed' }); }
});

// Create appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const { name, email, doctorId, date } = req.body;
    if(!name || !email || !doctorId || !date) return res.status(400).json({ error: 'Missing fields' });
    const appt = new Appointment({ name, email, doctor: doctorId, date });
    await appt.save();
    res.status(201).json(appt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// List appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const list = await Appointment.find().populate('doctor');
    res.json(list);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));