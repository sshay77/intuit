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