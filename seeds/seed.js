const sequelize = require('../config/connection');
const { User, Message, Comment } = require('../models');

const userData = require('./userData.json');
const messageData = require('./messageData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // making users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  // making messages
  for (const message of messageData) {
    await Message.create({
      ...message,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // making comments
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      message_id: Math.ceil(Math.random() * commentData.length),
    });
  }

  process.exit(0);
};

seedDatabase();
