const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    
},{ timestamps: true });

const Report = mongoose.model('reports', reportSchema);
module.exports = Report;