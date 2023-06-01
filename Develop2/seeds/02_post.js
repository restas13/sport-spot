const { Post } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed posts data
    await Post.bulkCreate([
      {
        title: 'Post 1',
        content: 'This is the content of Post 1',
        userId: 1,
      },
      {
        title: 'Post 2',
        content: 'This is the content of Post 2',
        userId: 2,
      },
      // Add more posts as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all posts
    await Post.destroy({ where: {} });
  },
};
