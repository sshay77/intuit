import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './complaint-details.css'
export default function ComplaintDetails() {
    const { complaintId } = useParams();
    const [complaint, setComplaint] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/complaints/details/' + complaintId)
            .then(res => res.json())
            .then(data => setComplaint(data.data));
    }, [complaintId]);

    return (
        <div className='complaint-details'>
            <Link to="/all-complaints">Back</Link>
            
            <h3>Complaint {complaintId}</h3>

            <h4>User:</h4>

            <div>Name: {complaint?.user?.fullName}</div>
            <div>Email: {complaint?.user?.emailAddress}</div>
            <div>Address: {complaint?.user?.physicalAddress}</div>
            
            <h4>Complaint:</h4>
            <div>Subject: {complaint?.subject}</div>
            <div>Complaint: {complaint?.complaint}</div>
            <div>CreatedAt: {new Date(complaint?.createdAt).toLocaleString()}</div>
            <div>Purchase Id: {complaint.purchaseId}</div>

            <h4>Purchase:</h4>
            {complaint?.purchase && !complaint.purchase.error ? (
                <>
                <div>Product Name: {complaint.purchase.productName}</div>
                <div>Id: {complaint.purchase.id}</div>
                <div>Price: {complaint.purchase.pricePaidAmount + ' ' + complaint.purchase.priceCurrency}</div>
                <div>Discount: {complaint.purchase.discountPercent}%</div>
                <div>Purchase Date: {new Date(complaint?.purchaseDate).toLocaleString()}</div>
                </>
            ) : (<div>No purchase data</div>)}

            <h4>Raw Data</h4>
            
            <plaintext>
                {JSON.stringify(complaint, null, 4)}
            </plaintext>
            <Link to="/all-complaints">Back</Link>
        </div>
    )
}
