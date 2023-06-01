const router = require('express').Router();
const { Result } = require('../models');

// Define the GET route for the homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve the last trending NBA results
    const trendingResults = await Result.findAll({
      // Your query to retrieve the last trending results
      // For example:
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    // Render the homepage view with the trending results
    res.render('homepage', { trendingResults });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

