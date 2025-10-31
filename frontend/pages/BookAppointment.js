import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function BookAppointment(){
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({name:'',email:'',doctorId:'',date:''});

  useEffect(()=>{
    axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/doctors')
      .then(r=>setDoctors(r.data)).catch(err=>console.error(err));
  },[]);

  const submit = async e =>{
    e.preventDefault();
    try{
      await axios.post((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/appointments', {
        name: form.name,
        email: form.email,
        doctorId: form.doctorId,
        date: form.date
      });
      alert('Appointment requested');
      setForm({name:'',email:'',doctorId:'',date:''});
    } catch (err){
      console.error(err);
      alert('Failed to book');
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth:400 }}>
      <div><input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required /></div>
      <div><input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></div>
      <div>
        <select value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})} required>
          <option value="">Select doctor</option>
          {doctors.map(d=> <option key={d._id} value={d._id}>{d.name} — {d.department}</option>)}
        </select>
      </div>
      <div><input type="datetime-local" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required /></div>
      <div><button type="submit">Book</button></div>
    </form>
  )
}