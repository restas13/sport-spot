const router = require('express').Router();
const userRoutes = require('./userRoutes');
const sportsRoutes = require('./sportsRoutes');

router.use('/users', userRoutes);
router.use('/sports', sportsRoutes);

module.exports = router;
