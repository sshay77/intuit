const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        complaint: {
            type: String,
            required: true
        },
        purchaseId: {
            type: String        
        },
        // additional data
        user: {
            type: Object
        },
        purchase: {
            type: Object
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Complaint', complaintSchema);