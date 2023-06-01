const express = require('express');
const router = express.Router();

// Import the necessary routes
const homeRoutes = require('./homeRoutes');
const searchRoutes = require('./searchRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// Define the routes
router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
