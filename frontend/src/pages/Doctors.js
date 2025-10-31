import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Doctors(){
  const [doctors, setDoctors] = useState([]);
  useEffect(()=>{
    axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api/doctors')
      .then(r=>setDoctors(r.data))
      .catch(err=>console.error(err));
  },[]);
  return (
    <div>
      <h2>Doctors</h2>
      <ul>{doctors.map(d=> <li key={d._id}>{d.name} — {d.department}</li>)}</ul>
    </div>
  )
}