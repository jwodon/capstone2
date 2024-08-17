const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/', UserController.createUser);
// Add more routes as needed

module.exports = router;
