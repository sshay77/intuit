const express = require('express');
const usersRouter = require('./routes/users');
const complaintsRouter = require('./routes/complaints');
require('./config/dbConfig');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => {
  res.send({
    success: true,
    message:'Healthy!'});

});

app.use("/api/users", usersRouter);
app.use("/api/complaints", complaintsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// const Queue = require('bee-queue');
// const purchaseQueue = new Queue('purchase');

// // Process jobs from as many servers or processes as you like
// const Complaint = require('./models/complaintModel');
// purchaseQueue.process(async function  (job, done) {
//   console.log(`Processing job ${job.id} purchase ${job.data.id}`)

//   const res = await Complaint.findByIdAndUpdate(job.data.id, {process: { user: true}});
//   console.log(res)
//   return done(null, job.data.id);
// });