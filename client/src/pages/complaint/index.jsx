import { useState } from 'react';
import './header.css'
import Header from '../../features/header';
import PropTypes from "prop-types";

Complaint.propTypes = {
  userId: PropTypes.string
};

export default function Complaint({ userId }) {
  if (!userId) {
    window.location.href = "/";
  }

  const [complaint, setComplaint] = useState({ subject: '', purchaseId: '' });

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...complaint, userId
        })
      });

      const data = await res.json();
      if(data.success === true) {
        alert('Thanks!');
      }else {
        throw new Error('Could not submit complaint, please try again');
      }
      
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="complaint">
      <Header />

      <div>subject: <input type="text"
        value={complaint.subject} onChange={e => setComplaint({ ...complaint, subject: e.target.value })} />
      </div>
      <div>complaint: <textarea name="" id="" cols="30" rows="10"
        value={complaint.complaint} onChange={e => setComplaint({ ...complaint, complaint: e.target.value })}>
      </textarea>
      </div>
      <div>purchaseId: <input type="text"
        value={complaint.purchaseId} onChange={e => setComplaint({ ...complaint, purchaseId: e.target.value })} />
      </div>
      <div><button onClick={handleSubmit}>Submit</button></div>
    </div>
  );
}