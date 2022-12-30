const Patient = require('../models/patient');

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

var csv = require('csv-express')
const path = require('path')
const json2csv = require('json2csv').parse;
const fs = require('fs');


// download csv of patient
module.exports.patientDownloadCsv = async(req,res) => {

    const fields = ['name', 'phone'];

    Patient.find().lean().exec({}, function(err, patient) {
        if (err) {
            return res.status(500).json({ 
                'success' : false,
                'err' : err,
            });
        } else {
            const csvData = json2csv(patient, { fields });
            var filename   = "patients.csv";

            // ƒile path to store csv
            const filePath = path.join(__dirname, "..", "public", filename)

            fs.writeFile(filePath, csvData, function (err) {
                if (err) {
                    return res.status(500).json({ 
                        'success' : false,
                        'err' : err,
                    });
                }
                else {
                    setTimeout(function () {
                        fs.unlinkSync(filePath); // delete this file after 30 seconds
                    }, 30000)

                    return res.status(200).json({
                        'success' : true,
                        'fileUrl' : "/exports/" + filename,
                    });
                }
            });
        }
    })

    //  var filename   = "patients.csv";    
   
    //  Patient.find().lean().exec({}, function(err, patient) {
        //  if (err) res.send(err);
            
        //  res.statusCode = 200;
        //  res.setHeader('Content-Type', 'text/csv');
        //  res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        //  res.csv(patient, true);

    // });

}