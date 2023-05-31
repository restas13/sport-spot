const User = require('./User');
const Library = require('./Library');
const Post = require('./Posts');

Library.hasMany(Post, {
  foreignKey: 'library_id',
});

Post.belongsTo(Library, {
  foreignKey: 'library_id',
});

module.exports = { User, Library, Post };
