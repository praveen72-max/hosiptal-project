import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';

export default function App(){
  return (
    <BrowserRouter>
      <div style={{ padding:20 }}>
        <h1>Hospital Website</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/doctors">Doctors</Link> | <Link to="/book">Book Appointment</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/book" element={<BookAppointment/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}