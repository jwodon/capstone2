const express = require('express');
const TDEELogController = require('../controllers/tdeeLogController');
const router = express.Router();

router.post('/', TDEELogController.createLog);
// Add more routes as needed

module.exports = router;
