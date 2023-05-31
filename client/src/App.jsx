import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Login from './pages/login/index';
import Complaint from "./pages/complaint/index";
import AllComplaints from "./pages/all-complaints";
import ComplaintDetails from "./pages/complaint-details";
import { apiBaseUrl } from './config';

function App() {
  const [user, setUser] = useState({});

  const handleUserChange = async (e) => {
    const response = await fetch(`${apiBaseUrl}users/${e.target.value}`)
      .then(res => res.json());
    if (response.success === true) {
      setUser(response.data)
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login user={user} handleUserChange={handleUserChange} />} />
          <Route path="/login" element={<Login user={user} handleUserChange={handleUserChange} />} />
          <Route path="/complaint" element={<Complaint userId={user.id} />} />
          <Route path="/all-complaints" element={<AllComplaints />} />
          <Route path=":complaintId" element={<ComplaintDetails />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App