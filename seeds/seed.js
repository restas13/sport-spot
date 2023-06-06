const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Seed users data
    await User.bulkCreate([
      {
        username: 'restas13',
        email: 'dupareed@gmail.com',
        password: 'Lestat135!',
      },
      {
        username: 'poisonGamesyt',
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