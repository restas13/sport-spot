const router = require ('express').Router();
const apiRoutes = require('./api');

router.use('/apu', apiRoutes);

module.exports = router;