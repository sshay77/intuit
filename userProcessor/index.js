const db = require('./config/dbConfig');
const Queue = require('bee-queue');
const Complaint = require('./models/complaintModel');

const userQueue = new Queue('user');

db.on('connected', () => {
    userQueue.process(async function (job, done) {
        console.log(`Processing job ${job.id} purchase ${job.data.id}`)
        try {
            const complaint = await Complaint.findById(job.data.id);
            if (!complaint.userId || complaint.user) {
                return;
            }
            const response = await fetch('http://localhost:8081/users/' + complaint.userId)
            const data = await response.json();
            complaint.user = data;
            const saveRes = await complaint.save();

            console.log(saveRes);
            return done(null, job.data.id);
        } catch (err) {
            console.error(err);
        }
    });
});