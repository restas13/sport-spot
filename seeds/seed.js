const bcrypt = require('bcrypt');
const { User, Post } = require('../models');


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
      {
        username: 'GameLover01',
        email: 'gameLover01@gmail.com',
        password: '123789wx',
      },
      {
        username: '3pointsonly',
        email: '3pointsolnly@gmail.com',
        password: 'wx123vb',
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all users
    await User.destroy({ where: {} });
  },
};

const postData = require('./posts.json');
const userData = require('./userData.json');
const sequelize = require('../config/connection');

const seed_db = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seed_db();