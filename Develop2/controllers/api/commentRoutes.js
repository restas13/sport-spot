const router = require('express').Router();

// Import the necessary models

// Define the POST route for adding a comment
router.post('/comments', async (req, res) => {
  try {
    // Create a new comment with the provided data
    // Return the newly created comment
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define the GET route for retrieving comments for a specific NBA result
router.get('/comments/:resultId', async (req, res) => {
  try {
    // Retrieve all comments for the specified NBA result
    // Return the comments
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
