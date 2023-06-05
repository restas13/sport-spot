const router = require('express').Router();
const { Comment } = require('../../models');

// Define the POST route for adding a comment
router.post('/', async (req, res) => {
  try {
    // Create a new comment with the provided data
    const newComment = await Comment.create({
      content: req.body.commentText,
      user_id: req.session.user_id,
      post_id: req.body.postId
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define the GET route for retrieving comments for a specific NBA result
router.get('/:resultId', async (req, res) => {
  try {
    // Retrieve all comments for the specified NBA result
    const comments = await Comment.findAll({
      where: { post_id: req.params.resultId },
      include: 'user'
    });

    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
