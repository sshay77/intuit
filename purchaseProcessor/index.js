const db = require('./config/dbConfig');
const Queue = require('bee-queue');
const Complaint = require('./models/complaintModel');

const purchaseQueue = new Queue('purchase');

db.on('connected', () => {
    purchaseQueue.process(async function (job, done) {
        console.log(`Processing job ${job.id} purchase ${job.data.id}`)
        try {
            const complaint = await Complaint.findById(job.data.id);
            if (!complaint.purchaseId || complaint.purchase) {
                return
            }
            const response = await fetch('http://localhost:8081/purchases/' + complaint.purchaseId)
            const data = await response.json();
            complaint.purchase = data;
            const saveRes = await complaint.save();

            console.log(saveRes);
            return done(null, job.data.id);
        } catch (err) {
            console.error(err);
        }
    });
});