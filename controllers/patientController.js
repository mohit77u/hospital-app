const Patient = require('../models/patient')

// render the sign up page
module.exports.patientSignup = function(req,res){
    return res.render('doctor/patient-create')
};

// render the patients page
module.exports.index = function(req,res){
    const doctorId = req.params.doctorId
    Patient.find({doctorId: doctorId}, function(err, patients) {
        if (err) {
            console.log("Error in fetching Patient");
        }
        
        res.render('doctor/patients', {
        patients : patients
        });
    });
};


// create patient
module.exports.create = async(req, res) =>{
    console.log(req.body.doctorId)
    // find patient by phone and doctor id
    const patientExists = await Patient.find({ 
        $and: [ 
            { doctorId: req.body.doctorId }, 
            { phone: req.body.phone } 
        ] 
    }).exec();

    // console.log(patientExists.length)

    // if patient not exists
    if (!patientExists.length > 0) {
        const patient = new Patient({
            doctorId: req.body.doctorId,
            name: req.body.name,
            phone: req.body.phone,
        });
    
        await patient.save();
        req.flash('success', 'Patient created successfully.');
        return res.redirect('back');
    }
    else
    {
        req.flash('error', 'Patient already exists with phone number entered.');
        return res.redirect('back');
    }
}