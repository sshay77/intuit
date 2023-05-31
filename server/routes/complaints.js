const router = require('express').Router();
const Complaint = require('../models/complaintModel');

const Queue = require('bee-queue');
const purchaseQueue = new Queue('purchase');
const userQueue = new Queue('user');

router.get('/details/:complaintId', async (req, res) => {
    console.log(req.params);
    const { complaintId } = req.params;
    const complaint = await Complaint.findById(complaintId);
    let needToSave = false;

    if (complaint.purchaseId && !complaint.purchase) {
        const response = await fetch('http://localhost:8081/purchases/' + complaint.purchaseId)
        const data = await response.json();
        complaint.purchase = data;
        needToSave = true;
    }

    if (complaint.userId && !complaint.user) {
        const response = await fetch('http://localhost:8081/users/' + complaint.userId)
        const data = await response.json();
        complaint.user = data;
        needToSave = true;
    }
    
    if (needToSave) {
        await complaint.save();
    }

    res.send({
        success: true,
        data: complaint
    })

});

router.post('/', async (req, res) => {
    console.log('Body', req.body);
    try {
        const newComplaint = new Complaint(req.body);
        const resp = await newComplaint.save();
        const complaintId = resp._id.toString();
                
        pushComplaintToQueue(complaintId);

        res.status(200).json({ success: true, data: resp.toJSON()});
    } catch (e) {
        console.error(e);
        res.send({
            success: false,
            message: e.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const allComplaints = await Complaint.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            data: allComplaints
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
});

module.exports = router;

function pushComplaintToQueue(complaintId) {
    const purchaseJob = purchaseQueue.createJob({ id: complaintId });
    purchaseJob.save();
    purchaseJob.on('purchase succeeded', (result) => {
        console.log(`Received result for purchase job ${purchaseJob.id}: ${result}`);
    });

    const userJob = userQueue.createJob({ id: complaintId });
    userJob.save();
    userJob.on('user succeeded', (result) => {
        console.log(`Received result for user job ${userJob.id}: ${result}`);
    });
}
