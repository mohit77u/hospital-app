const express = require('express');
const router = express.Router();
const passport = require('passport');

const reportController = require('../controllers/reportController');

router.get('/reports/:patientId', passport.checkDoctorRole, reportController.index);
router.post('/create-report/:patientId', reportController.create);

module.exports = router; 