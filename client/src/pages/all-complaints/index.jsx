import './all-complaints.css';

import {useState, useEffect} from 'react';
import Header from '../../features/header'; 
import {Link} from 'react-router-dom'

export default function AllComplaints() {
    const [allComplaints, setAllComplaints] = useState([]);

    useEffect(() => {
        loadAllComplaints()
    }, []);

    function loadAllComplaints() {
        fetch('http://localhost:5000/api/complaints')
            .then(res => res.json())
            .then(data => setAllComplaints(data.data));
    }

    return (
        <div className="allComplaints">
            <Header />
            <ul>
                {allComplaints?.map((c, i) => (
                    <li key={i}>
                        <div>id: {c._id}</div>
                        <div>user id: {c.userId}</div>
                        <div className="panel">
                            <div>name:</div>
                            <div>email: </div>
                        </div>
                        <div>subject: {c.subject}</div>
                        <div>complaint: {c.complaint}</div>
                        <div>purchase id: {c.purchaseId}</div>
                        <Link to={'/' + c._id}>Details</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}