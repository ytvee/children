const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/slots', viewController.getSlots);
router.get('/doctors', viewController.getDoctors);
router.get('/patients', viewController.getPatients);
router.get('/procedures', viewController.getProcedures);

module.exports = router;