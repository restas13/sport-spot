const { Post, Comment } = require('../../models');

const renderDiscussionPage = async (req, res) => {
  try {
    const { gameId } = req.params;
    const posts = await Post.find({ gameId });
    const comments = await Comment.find({ gameId });
    res.render('discussion', { posts, comments, gameId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    const { gameId, title, content } = req.body;
    const post = await Post.create({ gameId, title, content });
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Implement other functions for updating and deleting posts/comments

module.exports = {
  renderDiscussionPage,
  createPost,
  // Add other controller functions for updating and deleting posts/comments
};
