const express = require('express');
const router = express.Router();

// Import the necessary routes
const apiRoutes = require('./api');

// Define the routes
router.use('/api', apiRoutes);

module.exports = router;
