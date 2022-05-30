const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Products belongsTo Category
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Categories have many Products
Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// Categories have many Products
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = {
  User,
  Post,
  Comment
};