const express = require('express');
const authController = require('../controllers/authController.js'); // This should match the actual path to authController.js
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
