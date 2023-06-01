const express = require('express');
const router = express.Router();

// Import your API routes here
const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);

module.exports = router;
