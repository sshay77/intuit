const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://sshay:chatpassword@cluster0.gkk1zki.mongodb.net/intuit";
mongoose.connect(mongoUrl);
console.log('trying to connect ' + mongoUrl);
const db = mongoose.connection;
db.on('connected', ()=> console.log('mongodb success') );
db.on('error', (err)=>console.log(`mongodb failed to connect ${err.message}`));

module.exports = db;