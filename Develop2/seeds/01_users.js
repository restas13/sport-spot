const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed users data
    await User.bulkCreate([
      {
        username: 'user1',
        password: hashedPassword,
      },
      {
        username: 'user2',
        password: hashedPassword,
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all users
    await User.destroy({ where: {} });
  },
};
