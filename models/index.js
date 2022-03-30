const User = require('./User');
const Message = require('./Message');
const Comment = require('./Comment');

User.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',
});

Message.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Message, Comment };
