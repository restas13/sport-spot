const { Comment } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed comments data
    await Comment.bulkCreate([
      {
        text: 'Comment 1',
        postId: 1,
      },
      {
        text: 'Comment 2',
        postId: 1,
      },
      // Add more comments as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all comments
    await Comment.destroy({ where: {} });
  },
};
