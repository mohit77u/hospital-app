const express = require('express');
const router = express.Router();
const passport = require('passport');

const patientController = require('../controllers/patientController');

router.get('/patient-create', passport.checkDoctorRole, patientController.patientSignup);
router.get('/patients/:doctorId', passport.checkDoctorRole, patientController.index);
router.post('/create-patient', passport.checkDoctorRole, patientController.create);
router.get('/patient-csv-download', patientController.patientDownloadCsv);

module.exports = router; 