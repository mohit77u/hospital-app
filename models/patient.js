const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    
},{ timestamps: true });

// find By patientname
patientSchema.statics.findByPhone = async(phone) => {
    const patient = await Patient.findOne({ phone });
    return patient;
};


const Patient = mongoose.model('patients', patientSchema);
module.exports = Patient;