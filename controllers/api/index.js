const router = require('express').Router();
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
