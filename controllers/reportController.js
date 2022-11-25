const Report = require('../models/reports')
const Patient = require('../models/patient')

// render the patients page
module.exports.index = async(req,res) =>{
    // patient with paientiD
    const patientId = req.params.patientId
    // console.log(patientId)
    const patient = await Patient.findById(patientId).exec();

    // const patient = Patient.findById(patientId)
    // console.log(patient)

    Report.find({patientId: patientId}, function(err, reports) {
        if (err) {
            console.log("Error in fetching Reports");
        }

        res.render('doctor/reports/patient-reports', {
            reports : reports ?? [],
            patient : patient,
        });
    });
};


// create patient
module.exports.create = async(req, res) =>{

    const report = new Report({
        patientId: req.params.patientId,
        name: req.body.name,
        status: req.body.status,
    });

    await report.save();
    req.flash('success', 'Report created successfully.');
    return res.redirect('back');
}