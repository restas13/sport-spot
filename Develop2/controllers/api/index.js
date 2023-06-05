const express = require('express');
const router = express.Router();

// Import your API routes here
const usersRoutes = require('./userRoutes');
const postsRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/home', homeRoutes);
router.use('/comments', commentRoutes);

module.exports = router;