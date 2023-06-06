const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const discussionRoutes = require('./discussionRoutes');
const sportsRoutes = require('./sportsRoutes');
const featuredGamesRoutes = require('./featuredGamesRoutes'); // Update the file name if necessary


router.use('/user', userRoutes);
router.use('/discussion', discussionRoutes);
router.use('/sports', sportsRoutes);
router.use('/featuredGames', featuredGamesRoutes);

module.exports = router;



